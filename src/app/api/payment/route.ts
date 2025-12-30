import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { chargeCreditCard, validateCardDetails, ChargeRequest } from "@/lib/authorizenet";

interface ExtendedChargeRequest extends ChargeRequest {
    customerEmail?: string;
    shipping?: {
        firstName: string;
        lastName: string;
        company?: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
}

function detectCardBrand(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, "");
    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    if (/^6(?:011|5)/.test(cleaned)) return "discover";
    return "other";
}

export async function POST(request: NextRequest) {
    try {
        const body: ExtendedChargeRequest = await request.json();

        // Validate required fields
        if (!body.amount || body.amount <= 0) {
            return NextResponse.json(
                { success: false, message: "Invalid amount" },
                { status: 400 }
            );
        }

        if (!body.payment || !body.payment.cardNumber || !body.payment.expirationDate || !body.payment.cardCode) {
            return NextResponse.json(
                { success: false, message: "Payment details are required" },
                { status: 400 }
            );
        }

        if (!body.billing || !body.billing.firstName || !body.billing.lastName || !body.billing.address) {
            return NextResponse.json(
                { success: false, message: "Billing address is required" },
                { status: 400 }
            );
        }

        // Validate card details
        const cardErrors = validateCardDetails(
            body.payment.cardNumber,
            body.payment.expirationDate,
            body.payment.cardCode
        );

        if (cardErrors.length > 0) {
            return NextResponse.json(
                { success: false, message: "Invalid card details", errors: cardErrors },
                { status: 400 }
            );
        }

        // Process the payment
        const result = await chargeCreditCard(body);

        if (result.success) {
            // Payment successful - save order to database
            try {
                const payload = await getPayload({ config });

                // Find or create customer
                let customerId: number | null = null;
                const customerEmail = body.customerEmail || `${body.billing.firstName.toLowerCase()}.${body.billing.lastName.toLowerCase()}@placeholder.com`;

                const existingCustomers = await payload.find({
                    collection: "customers",
                    where: {
                        email: {
                            equals: customerEmail,
                        },
                    },
                    limit: 1,
                });

                if (existingCustomers.docs.length > 0) {
                    // Update existing customer
                    const existingCustomer = existingCustomers.docs[0];
                    customerId = existingCustomer.id as number;

                    await payload.update({
                        collection: "customers",
                        id: customerId,
                        data: {
                            totalOrders: ((existingCustomer.totalOrders as number) || 0) + 1,
                            totalSpent: ((existingCustomer.totalSpent as number) || 0) + body.amount,
                        },
                    });
                } else {
                    // Create new customer
                    const newCustomer = await payload.create({
                        collection: "customers",
                        data: {
                            firstName: body.billing.firstName,
                            lastName: body.billing.lastName,
                            email: customerEmail,
                            phone: body.billing.phoneNumber || "",
                            totalOrders: 1,
                            totalSpent: body.amount,
                            shippingAddresses: body.shipping ? [{
                                label: "Primary",
                                isDefault: true,
                                firstName: body.shipping.firstName,
                                lastName: body.shipping.lastName,
                                company: body.shipping.company || "",
                                address1: body.shipping.address,
                                city: body.shipping.city,
                                state: body.shipping.state,
                                zip: body.shipping.zip,
                                country: body.shipping.country || "US",
                            }] : [],
                        },
                    });
                    customerId = newCustomer.id as number;
                }

                // Calculate order totals
                const subtotal = body.lineItems?.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0) || body.amount;
                const tax = body.amount - subtotal; // Assuming tax is the difference

                // Create the order
                const order = await payload.create({
                    collection: "orders",
                    data: {
                        customer: customerId,
                        customerEmail: customerEmail,
                        status: "processing",
                        paymentStatus: "paid",
                        transactionId: result.transactionId,
                        authCode: result.authCode,
                        paymentMethod: "Credit Card",
                        cardLast4: body.payment.cardNumber.slice(-4),
                        cardBrand: detectCardBrand(body.payment.cardNumber),
                        items: body.lineItems?.map((item) => ({
                            productName: item.name,
                            sku: item.itemId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            lineTotal: item.quantity * item.unitPrice,
                        })) || [{
                            productName: "Order",
                            quantity: 1,
                            unitPrice: body.amount,
                            lineTotal: body.amount,
                        }],
                        billingAddress: {
                            firstName: body.billing.firstName,
                            lastName: body.billing.lastName,
                            company: body.billing.company || "",
                            address1: body.billing.address,
                            city: body.billing.city,
                            state: body.billing.state,
                            zip: body.billing.zip,
                            country: body.billing.country || "US",
                        },
                        shippingAddress: body.shipping ? {
                            firstName: body.shipping.firstName,
                            lastName: body.shipping.lastName,
                            company: body.shipping.company || "",
                            address1: body.shipping.address,
                            city: body.shipping.city,
                            state: body.shipping.state,
                            zip: body.shipping.zip,
                            country: body.shipping.country || "US",
                        } : {
                            firstName: body.billing.firstName,
                            lastName: body.billing.lastName,
                            address1: body.billing.address,
                            city: body.billing.city,
                            state: body.billing.state,
                            zip: body.billing.zip,
                            country: body.billing.country || "US",
                        },
                        subtotal: subtotal,
                        tax: tax > 0 ? tax : 0,
                        shippingCost: 0,
                        discount: 0,
                        total: body.amount,
                    },
                });

                return NextResponse.json({
                    success: true,
                    transactionId: result.transactionId,
                    authCode: result.authCode,
                    orderId: order.id,
                    orderNumber: order.orderNumber,
                    message: result.message,
                });
            } catch (dbError) {
                // Payment was successful but database save failed
                console.error("Database error (payment was successful):", dbError);
                return NextResponse.json({
                    success: true,
                    transactionId: result.transactionId,
                    authCode: result.authCode,
                    message: result.message,
                    warning: "Order was processed but there was an issue saving to the database.",
                });
            }
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: result.message,
                    errors: result.errors,
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Payment processing error:", error);
        return NextResponse.json(
            { success: false, message: "An error occurred while processing payment" },
            { status: 500 }
        );
    }
}

