// @ts-check

/**
 * @typedef {import("../generated/api").CartValidationsGenerateRunInput} CartValidationsGenerateRunInput
 * @typedef {import("../generated/api").CartValidationsGenerateRunResult} CartValidationsGenerateRunResult
 */

/**
 * @param {CartValidationsGenerateRunInput} input
 * @returns {CartValidationsGenerateRunResult}
 */
export function cartValidationsGenerateRun(input) {

  // No mostrar el error mientras el cliente simplemente
  // interactúa con los campos del checkout.
  if (input.buyerJourney.step !== "CHECKOUT_COMPLETION") {
    return { operations: [] };
  }

  const isPickup = input.cart.deliveryGroups.some(
    (group) =>
      group.selectedDeliveryOption?.deliveryMethodType === "PICK_UP"
  );

  const phone = input.cart.billingAddress?.phone?.trim();

  if (!isPickup || phone) {
    return { operations: [] };
  }

  return {
    operations: [
      {
        validationAdd: {
          errors: [
            {
              message: "Ingresa un n\u00famero de tel\u00e9fono para continuar.",
              target: "$.cart.billingAddress.phone",
            },
          ],
        },
      },
    ],
  };
}
