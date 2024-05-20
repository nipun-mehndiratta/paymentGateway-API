import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'copperx/pre-v0.0.1-beta.98 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /** @throws FetchError<500, types.StorageFileControllerPostResponse500> */
  storageFileController_post(body: types.StorageFileControllerPostBodyParam, metadata: types.StorageFileControllerPostMetadataParam): Promise<FetchResponse<200, types.StorageFileControllerPostResponse200>>;
  storageFileController_post(metadata: types.StorageFileControllerPostMetadataParam): Promise<FetchResponse<200, types.StorageFileControllerPostResponse200>>;
  storageFileController_post(body?: types.StorageFileControllerPostBodyParam | types.StorageFileControllerPostMetadataParam, metadata?: types.StorageFileControllerPostMetadataParam): Promise<FetchResponse<200, types.StorageFileControllerPostResponse200>> {
    return this.core.fetch('/api/v1/storage/files/{storageType}', 'post', body, metadata);
  }

  /** @throws FetchError<500, types.AuthControllerGetCurrentUserResponse500> */
  authController_getCurrentUser(): Promise<FetchResponse<200, types.AuthControllerGetCurrentUserResponse200>> {
    return this.core.fetch('/api/v1/auth/me', 'get');
  }

  /**
   * Returns the organization info
   *
   * @summary Get organization info
   * @throws FetchError<500, types.OrganizationControllerGetOrganizationInfoResponse500>
   */
  organizationController_getOrganizationInfo(): Promise<FetchResponse<200, types.OrganizationControllerGetOrganizationInfoResponse200>> {
    return this.core.fetch('/api/v1/organization', 'get');
  }

  /**
   * Updates the organization branding which will be reflected on payment pages, invoices,
   * etc.
   *
   * @summary Update branding
   * @throws FetchError<500, types.OrganizationControllerUpdateBrandingResponse500>
   */
  organizationController_updateBranding(body: types.OrganizationControllerUpdateBrandingBodyParam): Promise<FetchResponse<200, types.OrganizationControllerUpdateBrandingResponse200>> {
    return this.core.fetch('/api/v1/organization/brand', 'put', body);
  }

  /**
   * Delete Brand Logo
   *
   * @summary Delete Brand Logo
   * @throws FetchError<500, types.OrganizationControllerDeleteBrandLogoResponse500>
   */
  organizationController_deleteBrandLogo(): Promise<FetchResponse<200, types.OrganizationControllerDeleteBrandLogoResponse200>> {
    return this.core.fetch('/api/v1/organization/brand-logo', 'delete');
  }

  /**
   * Returns the list of users
   *
   * @summary List of users
   * @throws FetchError<500, types.UserControllerGetUsersResponse500>
   */
  userController_getUsers(): Promise<FetchResponse<200, types.UserControllerGetUsersResponse200>> {
    return this.core.fetch('/api/v1/users', 'get');
  }

  /**
   * Deletes a user
   *
   * @summary Delete a user
   * @throws FetchError<500, types.UserControllerDeleteUserResponse500>
   */
  userController_deleteUser(metadata: types.UserControllerDeleteUserMetadataParam): Promise<FetchResponse<200, types.UserControllerDeleteUserResponse200>> {
    return this.core.fetch('/api/v1/users/{id}', 'delete', metadata);
  }

  /**
   * Updates a user role
   *
   * @summary Update a user role
   * @throws FetchError<500, types.UserControllerUpdateUserRoleResponse500>
   */
  userController_updateUserRole(body: types.UserControllerUpdateUserRoleBodyParam, metadata: types.UserControllerUpdateUserRoleMetadataParam): Promise<FetchResponse<200, types.UserControllerUpdateUserRoleResponse200>> {
    return this.core.fetch('/api/v1/users/{id}/role', 'put', body, metadata);
  }

  /**
   * Returns the list of withdrawal addresses
   *
   * @summary List of withdrawal addresses
   * @throws FetchError<500, types.WithdrawalAddressControllerGetAllResponse500>
   */
  withdrawalAddressController_getAll(): Promise<FetchResponse<200, types.WithdrawalAddressControllerGetAllResponse200>> {
    return this.core.fetch('/api/v1/organization/withdrawal-addresses', 'get');
  }

  /**
   * Withdrawal Addresses are used to receive funds from the platform. You can create as many
   * withdrawal addresses you want, but only one can be marked as default.
   *
   * @summary Create a withdrawal address
   * @throws FetchError<500, types.WithdrawalAddressControllerCreateResponse500>
   */
  withdrawalAddressController_create(body: types.WithdrawalAddressControllerCreateBodyParam): Promise<FetchResponse<200, types.WithdrawalAddressControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/organization/withdrawal-addresses', 'post', body);
  }

  /**
   * Returns a withdrawal address
   *
   * @summary Get a withdrawal address
   * @throws FetchError<500, types.WithdrawalAddressControllerGetResponse500>
   */
  withdrawalAddressController_get(metadata: types.WithdrawalAddressControllerGetMetadataParam): Promise<FetchResponse<200, types.WithdrawalAddressControllerGetResponse200>> {
    return this.core.fetch('/api/v1/organization/withdrawal-addresses/{id}', 'get', metadata);
  }

  /**
   * Updates a withdrawal address
   *
   * @summary Update a withdrawal address
   * @throws FetchError<500, types.WithdrawalAddressControllerUpdateResponse500>
   */
  withdrawalAddressController_update(body: types.WithdrawalAddressControllerUpdateBodyParam, metadata: types.WithdrawalAddressControllerUpdateMetadataParam): Promise<FetchResponse<200, types.WithdrawalAddressControllerUpdateResponse200>> {
    return this.core.fetch('/api/v1/organization/withdrawal-addresses/{id}', 'put', body, metadata);
  }

  /**
   * Deletes a withdrawal address. If you delete your default address, then the first address
   * will be marked as default and you will receive next payments to that address.
   *
   * @summary Delete a withdrawal address
   * @throws FetchError<500, types.WithdrawalAddressControllerDeleteResponse500>
   */
  withdrawalAddressController_delete(metadata: types.WithdrawalAddressControllerDeleteMetadataParam): Promise<FetchResponse<200, types.WithdrawalAddressControllerDeleteResponse200>> {
    return this.core.fetch('/api/v1/organization/withdrawal-addresses/{id}', 'delete', metadata);
  }

  /**
   * Marks a withdrawal address as default.
   *
   * @summary Mark a withdrawal address as default
   * @throws FetchError<500, types.WithdrawalAddressControllerMarkAsDefaultResponse500>
   */
  withdrawalAddressController_markAsDefault(metadata: types.WithdrawalAddressControllerMarkAsDefaultMetadataParam): Promise<FetchResponse<200, types.WithdrawalAddressControllerMarkAsDefaultResponse200>> {
    return this.core.fetch('/api/v1/organization/withdrawal-addresses/{id}/mark-as-default', 'post', metadata);
  }

  /**
   * Returns payment setting info
   *
   * @summary Get payment setting info
   * @throws FetchError<500, types.PaymentSettingControllerGetResponse500>
   */
  paymentSettingController_get(): Promise<FetchResponse<200, types.PaymentSettingControllerGetResponse200>> {
    return this.core.fetch('/api/v1/organization/payment-setting', 'get');
  }

  /**
   * Returns invoice setting info
   *
   * @summary Get invoice setting info
   * @throws FetchError<500, types.InvoiceSettingControllerGetResponse500>
   */
  invoiceSettingController_get(): Promise<FetchResponse<200, types.InvoiceSettingControllerGetResponse200>> {
    return this.core.fetch('/api/v1/organization/invoice-setting', 'get');
  }

  /**
   * Returns the list of user invites
   *
   * @summary List of user invites
   * @throws FetchError<500, types.UserInviteControllerGetInvitesResponse500>
   */
  userInviteController_getInvites(): Promise<FetchResponse<200, types.UserInviteControllerGetInvitesResponse200>> {
    return this.core.fetch('/api/v1/invites', 'get');
  }

  /**
   * Invite a user
   *
   * @summary Invite a user
   * @throws FetchError<500, types.UserInviteControllerInviteUserResponse500>
   */
  userInviteController_inviteUser(body: types.UserInviteControllerInviteUserBodyParam): Promise<FetchResponse<200, types.UserInviteControllerInviteUserResponse200>> {
    return this.core.fetch('/api/v1/invites', 'post', body);
  }

  /**
   * Remove user invitation
   *
   * @summary Remove user invitation
   * @throws FetchError<500, types.UserInviteControllerRemoveInviteResponse500>
   */
  userInviteController_removeInvite(metadata: types.UserInviteControllerRemoveInviteMetadataParam): Promise<FetchResponse<200, types.UserInviteControllerRemoveInviteResponse200>> {
    return this.core.fetch('/api/v1/invites/{id}', 'delete', metadata);
  }

  /**
   * Resend user invitation
   *
   * @summary Resend user invitation
   * @throws FetchError<500, types.UserInviteControllerResendInviteResponse500>
   */
  userInviteController_resendInvite(metadata: types.UserInviteControllerResendInviteMetadataParam): Promise<FetchResponse<200, types.UserInviteControllerResendInviteResponse200>> {
    return this.core.fetch('/api/v1/invites/{id}/resend', 'post', metadata);
  }

  /**
   * Checkout Sessions allow you to create one-off payments in a fixed or variable amount or
   * start subscriptions for your customers. You should create a new Checkout Session for
   * each payment attempt. Once you create a Checkout Session on your server, you need to
   * redirect user to the Checkout Session URL to complete the payment flow.
   *
   * @summary Create a new checkout session
   * @throws FetchError<401, types.SessionsControllerCreateResponse401>
   * @throws FetchError<500, types.SessionsControllerCreateResponse500>
   */
  sessionsController_create(body: types.SessionsControllerCreateBodyParam): Promise<FetchResponse<200, types.SessionsControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/checkout/sessions', 'post', body);
  }

  /**
   * Returns ths list of checkout sessions
   *
   * @summary List of checkout sessions
   * @throws FetchError<500, types.SessionsControllerFindAllResponse500>
   */
  sessionsController_findAll(metadata?: types.SessionsControllerFindAllMetadataParam): Promise<FetchResponse<200, types.SessionsControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/checkout/sessions', 'get', metadata);
  }

  /**
   * Returns a checkout session
   *
   * @summary Get a checkout session
   * @throws FetchError<500, types.SessionsControllerFindOneResponse500>
   */
  sessionsController_findOne(metadata: types.SessionsControllerFindOneMetadataParam): Promise<FetchResponse<200, types.SessionsControllerFindOneResponse200>> {
    return this.core.fetch('/api/v1/checkout/sessions/{id}', 'get', metadata);
  }

  /**
   * Returns only a status of checkout session with its transaction hash
   *
   * @summary Get the status of checkout session
   * @throws FetchError<500, types.SessionsControllerCheckoutSessionCompletedStatusResponse500>
   */
  sessionsController_checkoutSessionCompletedStatus(metadata: types.SessionsControllerCheckoutSessionCompletedStatusMetadataParam): Promise<FetchResponse<200, types.SessionsControllerCheckoutSessionCompletedStatusResponse200>> {
    return this.core.fetch('/api/v1/checkout/sessions/{id}/completed_webhook_delivered', 'get', metadata);
  }

  /**
   * Create a payment link to accept payments from customers. You can accept payments in a
   * fixed or variable amount from your customers. Whether you are doing a freelancing,
   * running a crowdfunding campaign, accept donations, or just looking for a simple way to
   * build patrons via crypto, these payment links are the perfect solution.
   *
   * @summary Create a payment link
   * @throws FetchError<500, types.PaymentLinkControllerCreateResponse500>
   */
  paymentLinkController_create(body: types.PaymentLinkControllerCreateBodyParam): Promise<FetchResponse<200, types.PaymentLinkControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/payment-links', 'post', body);
  }

  /**
   * Returns the list of payment links
   *
   * @summary List of payment links
   * @throws FetchError<500, types.PaymentLinkControllerFindAllResponse500>
   */
  paymentLinkController_findAll(metadata?: types.PaymentLinkControllerFindAllMetadataParam): Promise<FetchResponse<200, types.PaymentLinkControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/payment-links', 'get', metadata);
  }

  /**
   * Returns a payment link
   *
   * @summary Get a payment link
   * @throws FetchError<500, types.PaymentLinkControllerGetResponse500>
   */
  paymentLinkController_get(metadata: types.PaymentLinkControllerGetMetadataParam): Promise<FetchResponse<200, types.PaymentLinkControllerGetResponse200>> {
    return this.core.fetch('/api/v1/payment-links/{linkId}', 'get', metadata);
  }

  /**
   * Updates a payment link
   *
   * @summary Update a payment link
   * @throws FetchError<500, types.PaymentLinkControllerUpdateResponse500>
   */
  paymentLinkController_update(body: types.PaymentLinkControllerUpdateBodyParam, metadata: types.PaymentLinkControllerUpdateMetadataParam): Promise<FetchResponse<200, types.PaymentLinkControllerUpdateResponse200>> {
    return this.core.fetch('/api/v1/payment-links/{linkId}', 'put', body, metadata);
  }

  /**
   * Deletes a payment link
   *
   * @summary Delete a payment link
   * @throws FetchError<500, types.PaymentLinkControllerDeleteResponse500>
   */
  paymentLinkController_delete(metadata: types.PaymentLinkControllerDeleteMetadataParam): Promise<FetchResponse<200, types.PaymentLinkControllerDeleteResponse200>> {
    return this.core.fetch('/api/v1/payment-links/{linkId}', 'delete', metadata);
  }

  /**
   * Activate a payment link
   *
   * @summary Activate a payment link
   * @throws FetchError<500, types.PaymentLinkControllerActivateResponse500>
   */
  paymentLinkController_activate(metadata: types.PaymentLinkControllerActivateMetadataParam): Promise<FetchResponse<200, types.PaymentLinkControllerActivateResponse200>> {
    return this.core.fetch('/api/v1/payment-links/{linkId}/activate', 'put', metadata);
  }

  /**
   * Deactivate a payment link
   *
   * @summary Deactivate a payment link
   * @throws FetchError<500, types.PaymentLinkControllerDeactivateResponse500>
   */
  paymentLinkController_deactivate(metadata: types.PaymentLinkControllerDeactivateMetadataParam): Promise<FetchResponse<200, types.PaymentLinkControllerDeactivateResponse200>> {
    return this.core.fetch('/api/v1/payment-links/{linkId}/deactivate', 'put', metadata);
  }

  /**
   * Creates a price with product
   *
   * @summary Create a price
   * @throws FetchError<500, types.PriceControllerCreateResponse500>
   */
  priceController_create(body: types.PriceControllerCreateBodyParam): Promise<FetchResponse<200, types.PriceControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/prices', 'post', body);
  }

  /**
   * Returns the list of prices
   *
   * @summary List of prices
   * @throws FetchError<500, types.PriceControllerFindAllResponse500>
   */
  priceController_findAll(metadata?: types.PriceControllerFindAllMetadataParam): Promise<FetchResponse<200, types.PriceControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/prices', 'get', metadata);
  }

  /**
   * Returns a price
   *
   * @summary Get a price
   * @throws FetchError<500, types.PriceControllerGetResponse500>
   */
  priceController_get(metadata: types.PriceControllerGetMetadataParam): Promise<FetchResponse<200, types.PriceControllerGetResponse200>> {
    return this.core.fetch('/api/v1/prices/{id}', 'get', metadata);
  }

  /**
   * Updates a price nickname and metadata
   *
   * @summary Update a price
   * @throws FetchError<500, types.PriceControllerUpdateResponse500>
   */
  priceController_update(body: types.PriceControllerUpdateBodyParam, metadata: types.PriceControllerUpdateMetadataParam): Promise<FetchResponse<200, types.PriceControllerUpdateResponse200>> {
    return this.core.fetch('/api/v1/prices/{id}', 'put', body, metadata);
  }

  /**
   * Creates a product
   *
   * @summary Create a product
   * @throws FetchError<500, types.ProductControllerCreateResponse500>
   */
  productController_create(body: types.ProductControllerCreateBodyParam): Promise<FetchResponse<200, types.ProductControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/products', 'post', body);
  }

  /**
   * Returns the list of products
   *
   * @summary List of products
   * @throws FetchError<500, types.ProductControllerFindAllResponse500>
   */
  productController_findAll(metadata?: types.ProductControllerFindAllMetadataParam): Promise<FetchResponse<200, types.ProductControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/products', 'get', metadata);
  }

  /**
   * Returns a product
   *
   * @summary Get a product
   * @throws FetchError<500, types.ProductControllerGetResponse500>
   */
  productController_get(metadata: types.ProductControllerGetMetadataParam): Promise<FetchResponse<200, types.ProductControllerGetResponse200>> {
    return this.core.fetch('/api/v1/products/{id}', 'get', metadata);
  }

  /**
   * Updates a product information
   *
   * @summary Update a product
   * @throws FetchError<500, types.ProductControllerUpdateResponse500>
   */
  productController_update(body: types.ProductControllerUpdateBodyParam, metadata: types.ProductControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ProductControllerUpdateResponse200>> {
    return this.core.fetch('/api/v1/products/{id}', 'put', body, metadata);
  }

  /**
   * Deletes a product
   *
   * @summary Delete a product
   * @throws FetchError<500, types.ProductControllerDeleteResponse500>
   */
  productController_delete(metadata: types.ProductControllerDeleteMetadataParam): Promise<FetchResponse<200, types.ProductControllerDeleteResponse200>> {
    return this.core.fetch('/api/v1/products/{id}', 'delete', metadata);
  }

  /**
   * Activate a product
   *
   * @summary Activate a product
   * @throws FetchError<500, types.ProductControllerActivateResponse500>
   */
  productController_activate(metadata: types.ProductControllerActivateMetadataParam): Promise<FetchResponse<200, types.ProductControllerActivateResponse200>> {
    return this.core.fetch('/api/v1/products/{id}/activate', 'put', metadata);
  }

  /**
   * Deactivate a product
   *
   * @summary Deactivate a product
   * @throws FetchError<500, types.ProductControllerDeactivateResponse500>
   */
  productController_deactivate(metadata: types.ProductControllerDeactivateMetadataParam): Promise<FetchResponse<200, types.ProductControllerDeactivateResponse200>> {
    return this.core.fetch('/api/v1/products/{id}/deactivate', 'put', metadata);
  }

  /**
   * Returns the list of subscriptions
   *
   * @summary List of subscriptions
   * @throws FetchError<500, types.SubscriptionControllerFindAllResponse500>
   */
  subscriptionController_findAll(metadata?: types.SubscriptionControllerFindAllMetadataParam): Promise<FetchResponse<200, types.SubscriptionControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/subscriptions', 'get', metadata);
  }

  /**
   * Returns a subscription
   *
   * @summary Get a subscription
   * @throws FetchError<500, types.SubscriptionControllerGetResponse500>
   */
  subscriptionController_get(metadata: types.SubscriptionControllerGetMetadataParam): Promise<FetchResponse<200, types.SubscriptionControllerGetResponse200>> {
    return this.core.fetch('/api/v1/subscriptions/{id}', 'get', metadata);
  }

  /**
   * Cancel a subscription. It ends the subscription immediately and no refund is made.
   *
   * @summary Cancel a subscription immediately
   * @throws FetchError<500, types.SubscriptionControllerEndResponse500>
   */
  subscriptionController_end(body: types.SubscriptionControllerEndBodyParam, metadata: types.SubscriptionControllerEndMetadataParam): Promise<FetchResponse<200, types.SubscriptionControllerEndResponse200>> {
    return this.core.fetch('/api/v1/subscriptions/{id}', 'delete', body, metadata);
  }

  /**
   * Cancel a subscription. It does not end the subscription, but it will be canceled at the
   * end of the period.
   *
   * @summary Cancel a subscription
   * @throws FetchError<500, types.SubscriptionControllerCancelResponse500>
   */
  subscriptionController_cancel(body: types.SubscriptionControllerCancelBodyParam, metadata: types.SubscriptionControllerCancelMetadataParam): Promise<FetchResponse<200, types.SubscriptionControllerCancelResponse200>> {
    return this.core.fetch('/api/v1/subscriptions/{id}/cancel', 'post', body, metadata);
  }

  /**
   * Resume a subscription. It resumes the subscription that is scheduled be cancel at the
   * end of the period.
   *
   * @summary Resume a subscription
   * @throws FetchError<500, types.SubscriptionControllerResumeResponse500>
   */
  subscriptionController_resume(metadata: types.SubscriptionControllerResumeMetadataParam): Promise<FetchResponse<200, types.SubscriptionControllerResumeResponse200>> {
    return this.core.fetch('/api/v1/subscriptions/{id}/resume', 'post', metadata);
  }

  /**
   * Creates as invoice
   *
   * @summary Create an invoice
   * @throws FetchError<500, types.InvoiceControllerCreateResponse500>
   */
  invoiceController_create(body: types.InvoiceControllerCreateBodyParam): Promise<FetchResponse<200, types.InvoiceControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/invoices', 'post', body);
  }

  /**
   * Returns the list of all invoices
   *
   * @summary List of all invoices
   * @throws FetchError<500, types.InvoiceControllerGetAllResponse500>
   */
  invoiceController_getAll(metadata?: types.InvoiceControllerGetAllMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerGetAllResponse200>> {
    return this.core.fetch('/api/v1/invoices', 'get', metadata);
  }

  /**
   * Returns an invoice
   *
   * @summary Get an invoice
   * @throws FetchError<500, types.InvoiceControllerGetResponse500>
   */
  invoiceController_get(metadata: types.InvoiceControllerGetMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerGetResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}', 'get', metadata);
  }

  /**
   * Creates a draft invoice
   *
   * @summary Update a draft invoice
   * @throws FetchError<500, types.InvoiceControllerUpdateResponse500>
   */
  invoiceController_update(body: types.InvoiceControllerUpdateBodyParam, metadata: types.InvoiceControllerUpdateMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerUpdateResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}', 'put', body, metadata);
  }

  /**
   * Deletes a draft invoice. If invoice is not in draft state, it should be voided and can
   * not be deleted.
   *
   * @summary Delete a draft invoice
   * @throws FetchError<500, types.InvoiceControllerDeleteResponse500>
   */
  invoiceController_delete(metadata: types.InvoiceControllerDeleteMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerDeleteResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}', 'delete', metadata);
  }

  /**
   * Duplicate an invoice using the incoming invoice id.
   *
   * @summary Duplicate an invoice
   * @throws FetchError<500, types.InvoiceControllerDuplicateInvoiceResponse500>
   */
  invoiceController_duplicateInvoice(metadata: types.InvoiceControllerDuplicateInvoiceMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerDuplicateInvoiceResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}/duplicate', 'post', metadata);
  }

  /**
   * Void an invoice. If an invoice is paid then it can not be voided.
   *
   * @summary Void an invoice
   * @throws FetchError<500, types.InvoiceControllerVoidInvoiceResponse500>
   */
  invoiceController_voidInvoice(metadata: types.InvoiceControllerVoidInvoiceMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerVoidInvoiceResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}/void', 'post', metadata);
  }

  /**
   * Mark an invoice as uncollectible. If an invoice is paid then it can not be marked as
   * uncollectible.
   *
   * @summary Mark an invoice as uncollectible
   * @throws FetchError<500, types.InvoiceControllerMarkUncollectibleInvoiceResponse500>
   */
  invoiceController_markUncollectibleInvoice(metadata: types.InvoiceControllerMarkUncollectibleInvoiceMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerMarkUncollectibleInvoiceResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}/mark-uncollectible', 'post', metadata);
  }

  /**
   * Finalize an invoice.
   *
   * @summary Finalize an invoice
   * @throws FetchError<500, types.InvoiceControllerFinalizeInvoiceResponse500>
   */
  invoiceController_finalizeInvoice(metadata: types.InvoiceControllerFinalizeInvoiceMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerFinalizeInvoiceResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}/finalize', 'post', metadata);
  }

  /**
   * Send email to customer. Finalize an invoice if not finalized.
   *
   * @summary Send email to customer. Finalize an invoice if not finalized.
   * @throws FetchError<500, types.InvoiceControllerFinalizeAndSendInvoiceResponse500>
   */
  invoiceController_finalizeAndSendInvoice(body: types.InvoiceControllerFinalizeAndSendInvoiceBodyParam, metadata: types.InvoiceControllerFinalizeAndSendInvoiceMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerFinalizeAndSendInvoiceResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}/send', 'post', body, metadata);
  }

  /**
   * Mark an open invoice as paid.
   *
   * @summary Mark an open invoice as paid.
   * @throws FetchError<500, types.InvoiceControllerPayInvoiceResponse500>
   */
  invoiceController_payInvoice(metadata: types.InvoiceControllerPayInvoiceMetadataParam): Promise<FetchResponse<200, types.InvoiceControllerPayInvoiceResponse200>> {
    return this.core.fetch('/api/v1/invoices/{id}/pay', 'post', metadata);
  }

  /**
   * Creates a customer
   *
   * @summary Create a customer
   * @throws FetchError<500, types.CustomerControllerCreateResponse500>
   */
  customerController_create(body: types.CustomerControllerCreateBodyParam): Promise<FetchResponse<200, types.CustomerControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/customers', 'post', body);
  }

  /**
   * Returns the list of customers
   *
   * @summary List of customers
   * @throws FetchError<500, types.CustomerControllerFindAllResponse500>
   */
  customerController_findAll(metadata?: types.CustomerControllerFindAllMetadataParam): Promise<FetchResponse<200, types.CustomerControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/customers', 'get', metadata);
  }

  /**
   * Returns a customer
   *
   * @summary Get a customer
   * @throws FetchError<500, types.CustomerControllerGetResponse500>
   */
  customerController_get(metadata: types.CustomerControllerGetMetadataParam): Promise<FetchResponse<200, types.CustomerControllerGetResponse200>> {
    return this.core.fetch('/api/v1/customers/{id}', 'get', metadata);
  }

  /**
   * Updates a customer email, phone, address, etc.
   *
   * @summary Update a customer
   * @throws FetchError<500, types.CustomerControllerUpdateResponse500>
   */
  customerController_update(body: types.CustomerControllerUpdateBodyParam, metadata: types.CustomerControllerUpdateMetadataParam): Promise<FetchResponse<200, types.CustomerControllerUpdateResponse200>> {
    return this.core.fetch('/api/v1/customers/{id}', 'put', body, metadata);
  }

  /**
   * Deletes a customer
   *
   * @summary Delete a customer
   * @throws FetchError<500, types.CustomerControllerDeleteResponse500>
   */
  customerController_delete(metadata: types.CustomerControllerDeleteMetadataParam): Promise<FetchResponse<200, types.CustomerControllerDeleteResponse200>> {
    return this.core.fetch('/api/v1/customers/{id}', 'delete', metadata);
  }

  /**
   * Returns the list of transactions
   *
   * @summary List of transactions
   * @throws FetchError<500, types.TransactionControllerFindAllResponse500>
   */
  transactionController_findAll(metadata?: types.TransactionControllerFindAllMetadataParam): Promise<FetchResponse<200, types.TransactionControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/transactions', 'get', metadata);
  }

  /**
   * Returns the list of assets
   *
   * @summary List of assets
   * @throws FetchError<500, types.AssetControllerFindAllResponse500>
   */
  assetController_findAll(metadata?: types.AssetControllerFindAllMetadataParam): Promise<FetchResponse<200, types.AssetControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/assets', 'get', metadata);
  }

  /**
   * Returns an asset
   *
   * @summary Get an asset
   * @throws FetchError<500, types.AssetControllerGetResponse500>
   */
  assetController_get(metadata: types.AssetControllerGetMetadataParam): Promise<FetchResponse<200, types.AssetControllerGetResponse200>> {
    return this.core.fetch('/api/v1/assets/{id}', 'get', metadata);
  }

  /**
   * Returns the list of chains with assets
   *
   * @summary List of chains
   * @throws FetchError<500, types.ChainControllerFindAllResponse500>
   */
  chainController_findAll(metadata?: types.ChainControllerFindAllMetadataParam): Promise<FetchResponse<200, types.ChainControllerFindAllResponse200>> {
    return this.core.fetch('/api/v1/chains', 'get', metadata);
  }

  /**
   * Returns a chain with assets
   *
   * @summary Get a chain
   * @throws FetchError<500, types.ChainControllerGetResponse500>
   */
  chainController_get(metadata: types.ChainControllerGetMetadataParam): Promise<FetchResponse<200, types.ChainControllerGetResponse200>> {
    return this.core.fetch('/api/v1/chains/{id}', 'get', metadata);
  }

  /**
   * Send payment receipt email to customer.
   *
   * @summary Send payment receipt email to customer.
   * @throws FetchError<500, types.PaymentIntentControllerSendCheckoutSessionPaymentReceiptResponse500>
   */
  paymentIntentController_sendCheckoutSessionPaymentReceipt(metadata: types.PaymentIntentControllerSendCheckoutSessionPaymentReceiptMetadataParam): Promise<FetchResponse<200, types.PaymentIntentControllerSendCheckoutSessionPaymentReceiptResponse200>> {
    return this.core.fetch('/api/v1/payment-intents/{paymentIntentId}/payment-receipts/send', 'post', metadata);
  }

  /**
   * Mark payment as refunded
   *
   * @summary Mark payment as refunded
   * @throws FetchError<500, types.PaymentIntentControllerMarkAsRefundedResponse500>
   */
  paymentIntentController_markAsRefunded(body: types.PaymentIntentControllerMarkAsRefundedBodyParam, metadata: types.PaymentIntentControllerMarkAsRefundedMetadataParam): Promise<FetchResponse<200, types.PaymentIntentControllerMarkAsRefundedResponse200>> {
    return this.core.fetch('/api/v1/payment-intents/{paymentIntentId}/mark-as-refund', 'post', body, metadata);
  }

  /**
   * Returns the list of coupons
   *
   * @summary List of coupons
   * @throws FetchError<500, types.CouponControllerSearchResponse500>
   */
  couponController_search(metadata?: types.CouponControllerSearchMetadataParam): Promise<FetchResponse<200, types.CouponControllerSearchResponse200>> {
    return this.core.fetch('/api/v1/coupons', 'get', metadata);
  }

  /**
   * Creates a coupon
   *
   * @summary Create a coupon
   * @throws FetchError<500, types.CouponControllerCreateResponse500>
   */
  couponController_create(body: types.CouponControllerCreateBodyParam): Promise<FetchResponse<200, types.CouponControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/coupons', 'post', body);
  }

  /**
   * Returns a coupon
   *
   * @summary Get a coupon
   * @throws FetchError<500, types.CouponControllerGetResponse500>
   */
  couponController_get(metadata: types.CouponControllerGetMetadataParam): Promise<FetchResponse<200, types.CouponControllerGetResponse200>> {
    return this.core.fetch('/api/v1/coupons/{id}', 'get', metadata);
  }

  /**
   * Updates a coupon
   *
   * @summary Update a coupon
   * @throws FetchError<500, types.CouponControllerUpdateResponse500>
   */
  couponController_update(body: types.CouponControllerUpdateBodyParam, metadata: types.CouponControllerUpdateMetadataParam): Promise<FetchResponse<200, types.CouponControllerUpdateResponse200>> {
    return this.core.fetch('/api/v1/coupons/{id}', 'put', body, metadata);
  }

  /**
   * Enable a coupon
   *
   * @summary Enable a coupon
   * @throws FetchError<500, types.CouponControllerEnableResponse500>
   */
  couponController_enable(metadata: types.CouponControllerEnableMetadataParam): Promise<FetchResponse<200, types.CouponControllerEnableResponse200>> {
    return this.core.fetch('/api/v1/coupons/{id}/enable', 'post', metadata);
  }

  /**
   * Disable a coupon
   *
   * @summary Disable a coupon
   * @throws FetchError<500, types.CouponControllerDisableResponse500>
   */
  couponController_disable(metadata: types.CouponControllerDisableMetadataParam): Promise<FetchResponse<200, types.CouponControllerDisableResponse200>> {
    return this.core.fetch('/api/v1/coupons/{id}/disable', 'post', metadata);
  }

  /**
   * Archive a coupon
   *
   * @summary Archive a coupon
   * @throws FetchError<500, types.CouponControllerArchiveResponse500>
   */
  couponController_archive(metadata: types.CouponControllerArchiveMetadataParam): Promise<FetchResponse<200, types.CouponControllerArchiveResponse200>> {
    return this.core.fetch('/api/v1/coupons/{id}/archive', 'post', metadata);
  }

  /** @throws FetchError<500, types.ConstantsControllerGetPricesResponse500> */
  constantsController_getPrices(metadata: types.ConstantsControllerGetPricesMetadataParam): Promise<FetchResponse<200, types.ConstantsControllerGetPricesResponse200>> {
    return this.core.fetch('/api/v1/constants/prices', 'get', metadata);
  }

  /** @throws FetchError<500, types.WebhookEndpointControllerGetAllResponse500> */
  webhookEndpointController_getAll(metadata?: types.WebhookEndpointControllerGetAllMetadataParam): Promise<FetchResponse<200, types.WebhookEndpointControllerGetAllResponse200>> {
    return this.core.fetch('/api/v1/webhook-endpoints', 'get', metadata);
  }

  /** @throws FetchError<500, types.WebhookEndpointControllerCreateResponse500> */
  webhookEndpointController_create(body: types.WebhookEndpointControllerCreateBodyParam): Promise<FetchResponse<200, types.WebhookEndpointControllerCreateResponse200>> {
    return this.core.fetch('/api/v1/webhook-endpoints', 'post', body);
  }

  /** @throws FetchError<500, types.WebhookEndpointControllerGetResponse500> */
  webhookEndpointController_get(metadata: types.WebhookEndpointControllerGetMetadataParam): Promise<FetchResponse<200, types.WebhookEndpointControllerGetResponse200>> {
    return this.core.fetch('/api/v1/webhook-endpoints/{id}', 'get', metadata);
  }

  /** @throws FetchError<500, types.WebhookEndpointControllerUpdateResponse500> */
  webhookEndpointController_update(body: types.WebhookEndpointControllerUpdateBodyParam, metadata: types.WebhookEndpointControllerUpdateMetadataParam): Promise<FetchResponse<200, types.WebhookEndpointControllerUpdateResponse200>> {
    return this.core.fetch('/api/v1/webhook-endpoints/{id}', 'put', body, metadata);
  }

  /** @throws FetchError<500, types.WebhookEndpointControllerDeleteResponse500> */
  webhookEndpointController_delete(metadata: types.WebhookEndpointControllerDeleteMetadataParam): Promise<FetchResponse<200, types.WebhookEndpointControllerDeleteResponse200>> {
    return this.core.fetch('/api/v1/webhook-endpoints/{id}', 'delete', metadata);
  }

  /** @throws FetchError<500, types.WebhookEndpointControllerRegenerateResponse500> */
  webhookEndpointController_regenerate(metadata: types.WebhookEndpointControllerRegenerateMetadataParam): Promise<FetchResponse<200, types.WebhookEndpointControllerRegenerateResponse200>> {
    return this.core.fetch('/api/v1/webhook-endpoints/{id}/regenerate', 'post', metadata);
  }

  /** @throws FetchError<500, types.WebhookEndpointControllerTestResponse500> */
  webhookEndpointController_test(metadata: types.WebhookEndpointControllerTestMetadataParam): Promise<FetchResponse<200, types.WebhookEndpointControllerTestResponse200>> {
    return this.core.fetch('/api/v1/webhook-endpoints/{id}/test', 'post', metadata);
  }

  /**
   * partner_api
   *
   * @summary Create an account for a partner
   * @throws FetchError<500, types.PartnerControllerCreateAccountResponse500>
   */
  partnerController_createAccount(body: types.PartnerControllerCreateAccountBodyParam): Promise<FetchResponse<200, types.PartnerControllerCreateAccountResponse200>> {
    return this.core.fetch('/api/v1/partners/accounts/onboard', 'post', body);
  }

  /**
   * partner_api
   *
   * @summary Get accounts of a partner by emails
   * @throws FetchError<500, types.PartnerControllerGetAccountResponse500>
   */
  partnerController_getAccount(metadata?: types.PartnerControllerGetAccountMetadataParam): Promise<FetchResponse<200, types.PartnerControllerGetAccountResponse200>> {
    return this.core.fetch('/api/v1/partners/accounts', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AssetControllerFindAllMetadataParam, AssetControllerFindAllResponse200, AssetControllerFindAllResponse500, AssetControllerGetMetadataParam, AssetControllerGetResponse200, AssetControllerGetResponse500, AuthControllerGetCurrentUserResponse200, AuthControllerGetCurrentUserResponse500, ChainControllerFindAllMetadataParam, ChainControllerFindAllResponse200, ChainControllerFindAllResponse500, ChainControllerGetMetadataParam, ChainControllerGetResponse200, ChainControllerGetResponse500, ConstantsControllerGetPricesMetadataParam, ConstantsControllerGetPricesResponse200, ConstantsControllerGetPricesResponse500, CouponControllerArchiveMetadataParam, CouponControllerArchiveResponse200, CouponControllerArchiveResponse500, CouponControllerCreateBodyParam, CouponControllerCreateResponse200, CouponControllerCreateResponse500, CouponControllerDisableMetadataParam, CouponControllerDisableResponse200, CouponControllerDisableResponse500, CouponControllerEnableMetadataParam, CouponControllerEnableResponse200, CouponControllerEnableResponse500, CouponControllerGetMetadataParam, CouponControllerGetResponse200, CouponControllerGetResponse500, CouponControllerSearchMetadataParam, CouponControllerSearchResponse200, CouponControllerSearchResponse500, CouponControllerUpdateBodyParam, CouponControllerUpdateMetadataParam, CouponControllerUpdateResponse200, CouponControllerUpdateResponse500, CustomerControllerCreateBodyParam, CustomerControllerCreateResponse200, CustomerControllerCreateResponse500, CustomerControllerDeleteMetadataParam, CustomerControllerDeleteResponse200, CustomerControllerDeleteResponse500, CustomerControllerFindAllMetadataParam, CustomerControllerFindAllResponse200, CustomerControllerFindAllResponse500, CustomerControllerGetMetadataParam, CustomerControllerGetResponse200, CustomerControllerGetResponse500, CustomerControllerUpdateBodyParam, CustomerControllerUpdateMetadataParam, CustomerControllerUpdateResponse200, CustomerControllerUpdateResponse500, InvoiceControllerCreateBodyParam, InvoiceControllerCreateResponse200, InvoiceControllerCreateResponse500, InvoiceControllerDeleteMetadataParam, InvoiceControllerDeleteResponse200, InvoiceControllerDeleteResponse500, InvoiceControllerDuplicateInvoiceMetadataParam, InvoiceControllerDuplicateInvoiceResponse200, InvoiceControllerDuplicateInvoiceResponse500, InvoiceControllerFinalizeAndSendInvoiceBodyParam, InvoiceControllerFinalizeAndSendInvoiceMetadataParam, InvoiceControllerFinalizeAndSendInvoiceResponse200, InvoiceControllerFinalizeAndSendInvoiceResponse500, InvoiceControllerFinalizeInvoiceMetadataParam, InvoiceControllerFinalizeInvoiceResponse200, InvoiceControllerFinalizeInvoiceResponse500, InvoiceControllerGetAllMetadataParam, InvoiceControllerGetAllResponse200, InvoiceControllerGetAllResponse500, InvoiceControllerGetMetadataParam, InvoiceControllerGetResponse200, InvoiceControllerGetResponse500, InvoiceControllerMarkUncollectibleInvoiceMetadataParam, InvoiceControllerMarkUncollectibleInvoiceResponse200, InvoiceControllerMarkUncollectibleInvoiceResponse500, InvoiceControllerPayInvoiceMetadataParam, InvoiceControllerPayInvoiceResponse200, InvoiceControllerPayInvoiceResponse500, InvoiceControllerUpdateBodyParam, InvoiceControllerUpdateMetadataParam, InvoiceControllerUpdateResponse200, InvoiceControllerUpdateResponse500, InvoiceControllerVoidInvoiceMetadataParam, InvoiceControllerVoidInvoiceResponse200, InvoiceControllerVoidInvoiceResponse500, InvoiceSettingControllerGetResponse200, InvoiceSettingControllerGetResponse500, OrganizationControllerDeleteBrandLogoResponse200, OrganizationControllerDeleteBrandLogoResponse500, OrganizationControllerGetOrganizationInfoResponse200, OrganizationControllerGetOrganizationInfoResponse500, OrganizationControllerUpdateBrandingBodyParam, OrganizationControllerUpdateBrandingResponse200, OrganizationControllerUpdateBrandingResponse500, PartnerControllerCreateAccountBodyParam, PartnerControllerCreateAccountResponse200, PartnerControllerCreateAccountResponse500, PartnerControllerGetAccountMetadataParam, PartnerControllerGetAccountResponse200, PartnerControllerGetAccountResponse500, PaymentIntentControllerMarkAsRefundedBodyParam, PaymentIntentControllerMarkAsRefundedMetadataParam, PaymentIntentControllerMarkAsRefundedResponse200, PaymentIntentControllerMarkAsRefundedResponse500, PaymentIntentControllerSendCheckoutSessionPaymentReceiptMetadataParam, PaymentIntentControllerSendCheckoutSessionPaymentReceiptResponse200, PaymentIntentControllerSendCheckoutSessionPaymentReceiptResponse500, PaymentLinkControllerActivateMetadataParam, PaymentLinkControllerActivateResponse200, PaymentLinkControllerActivateResponse500, PaymentLinkControllerCreateBodyParam, PaymentLinkControllerCreateResponse200, PaymentLinkControllerCreateResponse500, PaymentLinkControllerDeactivateMetadataParam, PaymentLinkControllerDeactivateResponse200, PaymentLinkControllerDeactivateResponse500, PaymentLinkControllerDeleteMetadataParam, PaymentLinkControllerDeleteResponse200, PaymentLinkControllerDeleteResponse500, PaymentLinkControllerFindAllMetadataParam, PaymentLinkControllerFindAllResponse200, PaymentLinkControllerFindAllResponse500, PaymentLinkControllerGetMetadataParam, PaymentLinkControllerGetResponse200, PaymentLinkControllerGetResponse500, PaymentLinkControllerUpdateBodyParam, PaymentLinkControllerUpdateMetadataParam, PaymentLinkControllerUpdateResponse200, PaymentLinkControllerUpdateResponse500, PaymentSettingControllerGetResponse200, PaymentSettingControllerGetResponse500, PriceControllerCreateBodyParam, PriceControllerCreateResponse200, PriceControllerCreateResponse500, PriceControllerFindAllMetadataParam, PriceControllerFindAllResponse200, PriceControllerFindAllResponse500, PriceControllerGetMetadataParam, PriceControllerGetResponse200, PriceControllerGetResponse500, PriceControllerUpdateBodyParam, PriceControllerUpdateMetadataParam, PriceControllerUpdateResponse200, PriceControllerUpdateResponse500, ProductControllerActivateMetadataParam, ProductControllerActivateResponse200, ProductControllerActivateResponse500, ProductControllerCreateBodyParam, ProductControllerCreateResponse200, ProductControllerCreateResponse500, ProductControllerDeactivateMetadataParam, ProductControllerDeactivateResponse200, ProductControllerDeactivateResponse500, ProductControllerDeleteMetadataParam, ProductControllerDeleteResponse200, ProductControllerDeleteResponse500, ProductControllerFindAllMetadataParam, ProductControllerFindAllResponse200, ProductControllerFindAllResponse500, ProductControllerGetMetadataParam, ProductControllerGetResponse200, ProductControllerGetResponse500, ProductControllerUpdateBodyParam, ProductControllerUpdateMetadataParam, ProductControllerUpdateResponse200, ProductControllerUpdateResponse500, SessionsControllerCheckoutSessionCompletedStatusMetadataParam, SessionsControllerCheckoutSessionCompletedStatusResponse200, SessionsControllerCheckoutSessionCompletedStatusResponse500, SessionsControllerCreateBodyParam, SessionsControllerCreateResponse200, SessionsControllerCreateResponse401, SessionsControllerCreateResponse500, SessionsControllerFindAllMetadataParam, SessionsControllerFindAllResponse200, SessionsControllerFindAllResponse500, SessionsControllerFindOneMetadataParam, SessionsControllerFindOneResponse200, SessionsControllerFindOneResponse500, StorageFileControllerPostBodyParam, StorageFileControllerPostMetadataParam, StorageFileControllerPostResponse200, StorageFileControllerPostResponse500, SubscriptionControllerCancelBodyParam, SubscriptionControllerCancelMetadataParam, SubscriptionControllerCancelResponse200, SubscriptionControllerCancelResponse500, SubscriptionControllerEndBodyParam, SubscriptionControllerEndMetadataParam, SubscriptionControllerEndResponse200, SubscriptionControllerEndResponse500, SubscriptionControllerFindAllMetadataParam, SubscriptionControllerFindAllResponse200, SubscriptionControllerFindAllResponse500, SubscriptionControllerGetMetadataParam, SubscriptionControllerGetResponse200, SubscriptionControllerGetResponse500, SubscriptionControllerResumeMetadataParam, SubscriptionControllerResumeResponse200, SubscriptionControllerResumeResponse500, TransactionControllerFindAllMetadataParam, TransactionControllerFindAllResponse200, TransactionControllerFindAllResponse500, UserControllerDeleteUserMetadataParam, UserControllerDeleteUserResponse200, UserControllerDeleteUserResponse500, UserControllerGetUsersResponse200, UserControllerGetUsersResponse500, UserControllerUpdateUserRoleBodyParam, UserControllerUpdateUserRoleMetadataParam, UserControllerUpdateUserRoleResponse200, UserControllerUpdateUserRoleResponse500, UserInviteControllerGetInvitesResponse200, UserInviteControllerGetInvitesResponse500, UserInviteControllerInviteUserBodyParam, UserInviteControllerInviteUserResponse200, UserInviteControllerInviteUserResponse500, UserInviteControllerRemoveInviteMetadataParam, UserInviteControllerRemoveInviteResponse200, UserInviteControllerRemoveInviteResponse500, UserInviteControllerResendInviteMetadataParam, UserInviteControllerResendInviteResponse200, UserInviteControllerResendInviteResponse500, WebhookEndpointControllerCreateBodyParam, WebhookEndpointControllerCreateResponse200, WebhookEndpointControllerCreateResponse500, WebhookEndpointControllerDeleteMetadataParam, WebhookEndpointControllerDeleteResponse200, WebhookEndpointControllerDeleteResponse500, WebhookEndpointControllerGetAllMetadataParam, WebhookEndpointControllerGetAllResponse200, WebhookEndpointControllerGetAllResponse500, WebhookEndpointControllerGetMetadataParam, WebhookEndpointControllerGetResponse200, WebhookEndpointControllerGetResponse500, WebhookEndpointControllerRegenerateMetadataParam, WebhookEndpointControllerRegenerateResponse200, WebhookEndpointControllerRegenerateResponse500, WebhookEndpointControllerTestMetadataParam, WebhookEndpointControllerTestResponse200, WebhookEndpointControllerTestResponse500, WebhookEndpointControllerUpdateBodyParam, WebhookEndpointControllerUpdateMetadataParam, WebhookEndpointControllerUpdateResponse200, WebhookEndpointControllerUpdateResponse500, WithdrawalAddressControllerCreateBodyParam, WithdrawalAddressControllerCreateResponse200, WithdrawalAddressControllerCreateResponse500, WithdrawalAddressControllerDeleteMetadataParam, WithdrawalAddressControllerDeleteResponse200, WithdrawalAddressControllerDeleteResponse500, WithdrawalAddressControllerGetAllResponse200, WithdrawalAddressControllerGetAllResponse500, WithdrawalAddressControllerGetMetadataParam, WithdrawalAddressControllerGetResponse200, WithdrawalAddressControllerGetResponse500, WithdrawalAddressControllerMarkAsDefaultMetadataParam, WithdrawalAddressControllerMarkAsDefaultResponse200, WithdrawalAddressControllerMarkAsDefaultResponse500, WithdrawalAddressControllerUpdateBodyParam, WithdrawalAddressControllerUpdateMetadataParam, WithdrawalAddressControllerUpdateResponse200, WithdrawalAddressControllerUpdateResponse500 } from './types';
