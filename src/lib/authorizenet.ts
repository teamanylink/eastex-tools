
import ApiContracts from "authorizenet/lib/apicontracts";
import ApiControllers from "authorizenet/lib/apicontrollers";
import SDKConstants from "authorizenet/lib/constants";

// Authorize.net configuration
const API_LOGIN_ID = process.env.AUTHORIZENET_API_LOGIN_ID || "";
const TRANSACTION_KEY = process.env.AUTHORIZENET_TRANSACTION_KEY || "";
const IS_PRODUCTION = process.env.AUTHORIZENET_ENVIRONMENT === "production";

interface PaymentDetails {
    cardNumber: string;
    expirationDate: string; // MMYY format
    cardCode: string;
}

interface BillingAddress {
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phoneNumber?: string;
}

interface ShippingAddress {
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface LineItem {
    itemId: string;
    name: string;
    description?: string;
    quantity: number;
    unitPrice: number;
}

interface ChargeRequest {
    amount: number;
    payment: PaymentDetails;
    billing: BillingAddress;
    shipping?: ShippingAddress;
    lineItems?: LineItem[];
    customerEmail?: string;
    orderDescription?: string;
    invoiceNumber?: string;
}

interface ChargeResponse {
    success: boolean;
    transactionId?: string;
    authCode?: string;
    responseCode?: string;
    message: string;
    errors?: string[];
}

/**
 * Create merchant authentication credentials
 */
function getMerchantAuthentication() {
    const merchantAuth = new ApiContracts.MerchantAuthenticationType();
    merchantAuth.setName(API_LOGIN_ID);
    merchantAuth.setTransactionKey(TRANSACTION_KEY);
    return merchantAuth;
}

/**
 * Charge a credit card using Authorize.net
 */
export async function chargeCreditCard(request: ChargeRequest): Promise<ChargeResponse> {
    return new Promise((resolve) => {
        // Set up credit card payment
        const creditCard = new ApiContracts.CreditCardType();
        creditCard.setCardNumber(request.payment.cardNumber);
        creditCard.setExpirationDate(request.payment.expirationDate);
        creditCard.setCardCode(request.payment.cardCode);

        const paymentType = new ApiContracts.PaymentType();
        paymentType.setCreditCard(creditCard);

        // Order info
        const orderDetails = new ApiContracts.OrderType();
        orderDetails.setInvoiceNumber(request.invoiceNumber || `INV-${Date.now()}`);
        orderDetails.setDescription(request.orderDescription || "Eastex Tool Purchase");

        // Line items
        const lineItemsArr: InstanceType<typeof ApiContracts.LineItemType>[] = [];
        if (request.lineItems && request.lineItems.length > 0) {
            for (const item of request.lineItems) {
                const lineItem = new ApiContracts.LineItemType();
                lineItem.setItemId(item.itemId);
                lineItem.setName(item.name);
                if (item.description) {
                    lineItem.setDescription(item.description);
                }
                lineItem.setQuantity(item.quantity.toString());
                lineItem.setUnitPrice(item.unitPrice.toFixed(2));
                lineItemsArr.push(lineItem);
            }
        }

        // Billing
        const billTo = new ApiContracts.CustomerAddressType();
        billTo.setFirstName(request.billing.firstName);
        billTo.setLastName(request.billing.lastName);
        if (request.billing.company) {
            billTo.setCompany(request.billing.company);
        }
        billTo.setAddress(request.billing.address);
        billTo.setCity(request.billing.city);
        billTo.setState(request.billing.state);
        billTo.setZip(request.billing.zip);
        billTo.setCountry(request.billing.country);
        if (request.billing.phoneNumber) {
            billTo.setPhoneNumber(request.billing.phoneNumber);
        }

        // Shipping (optional)
        let shipTo: InstanceType<typeof ApiContracts.CustomerAddressType> | null = null;
        if (request.shipping) {
            shipTo = new ApiContracts.CustomerAddressType();
            shipTo.setFirstName(request.shipping.firstName);
            shipTo.setLastName(request.shipping.lastName);
            if (request.shipping.company) {
                shipTo.setCompany(request.shipping.company);
            }
            shipTo.setAddress(request.shipping.address);
            shipTo.setCity(request.shipping.city);
            shipTo.setState(request.shipping.state);
            shipTo.setZip(request.shipping.zip);
            shipTo.setCountry(request.shipping.country);
        }

        // Transaction
        const txnRequest = new ApiContracts.TransactionRequestType();
        txnRequest.setTransactionType(
            ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
        );
        txnRequest.setPayment(paymentType);
        txnRequest.setAmount(request.amount.toFixed(2));
        txnRequest.setOrder(orderDetails);
        txnRequest.setBillTo(billTo);

        if (shipTo) {
            txnRequest.setShipTo(shipTo);
        }

        if (lineItemsArr.length > 0) {
            const lineItems = new ApiContracts.ArrayOfLineItem();
            lineItems.setLineItem(lineItemsArr);
            txnRequest.setLineItems(lineItems);
        }

        // Customer email
        if (request.customerEmail) {
            const customer = new ApiContracts.CustomerDataType();
            customer.setEmail(request.customerEmail);
            txnRequest.setCustomer(customer);
        }

        // Create the request
        const createRequest = new ApiContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(getMerchantAuthentication());
        createRequest.setTransactionRequest(txnRequest);

        // Execute
        const ctrl = new ApiControllers.CreateTransactionController(
            createRequest.getJSON()
        );

        // Set environment
        if (IS_PRODUCTION) {
            ctrl.setEnvironment(SDKConstants.endpoint.production);
        }

        ctrl.execute(() => {
            const apiResponse = ctrl.getResponse();
            const response = new ApiContracts.CreateTransactionResponse(apiResponse);

            if (response !== null) {
                if (
                    response.getMessages().getResultCode() ===
                    ApiContracts.MessageTypeEnum.OK
                ) {
                    const txnResponse = response.getTransactionResponse();
                    if (txnResponse.getMessages() !== null) {
                        resolve({
                            success: true,
                            transactionId: txnResponse.getTransId(),
                            authCode: txnResponse.getAuthCode(),
                            responseCode: txnResponse.getResponseCode(),
                            message: txnResponse.getMessages().getMessage()[0].getDescription(),
                        });
                    } else {
                        let errorText = "Transaction failed.";
                        if (txnResponse.getErrors() !== null) {
                            errorText = txnResponse.getErrors().getError()[0].getErrorText();
                        }
                        resolve({
                            success: false,
                            message: errorText,
                            errors: [errorText],
                        });
                    }
                } else {
                    let errorText = "Transaction failed.";
                    const txnResponse = response.getTransactionResponse();
                    if (
                        txnResponse !== null &&
                        txnResponse.getErrors() !== null
                    ) {
                        errorText = txnResponse.getErrors().getError()[0].getErrorText();
                    } else if (response.getMessages().getMessage().length > 0) {
                        errorText = response.getMessages().getMessage()[0].getText();
                    }
                    resolve({
                        success: false,
                        message: errorText,
                        errors: [errorText],
                    });
                }
            } else {
                resolve({
                    success: false,
                    message: "No response received from Authorize.net",
                    errors: ["No response received"],
                });
            }
        });
    });
}

/**
 * Validate credit card details (basic client-side validation)
 */
export function validateCardDetails(cardNumber: string, expirationDate: string, cardCode: string): string[] {
    const errors: string[] = [];

    // Remove spaces/dashes from card number
    const cleanCardNumber = cardNumber.replace(/[\s-]/g, "");

    // Card number validation (Luhn algorithm)
    if (!/^\d{13,19}$/.test(cleanCardNumber)) {
        errors.push("Invalid card number format");
    }

    // Expiration date validation (MMYY)
    if (!/^\d{4}$/.test(expirationDate)) {
        errors.push("Expiration date must be in MMYY format");
    } else {
        const month = parseInt(expirationDate.substring(0, 2), 10);
        const year = parseInt("20" + expirationDate.substring(2, 4), 10);
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (month < 1 || month > 12) {
            errors.push("Invalid expiration month");
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
            errors.push("Card has expired");
        }
    }

    // CVV validation
    if (!/^\d{3,4}$/.test(cardCode)) {
        errors.push("Invalid CVV code");
    }

    return errors;
}

export type { ChargeRequest, ChargeResponse, PaymentDetails, BillingAddress, ShippingAddress, LineItem };
