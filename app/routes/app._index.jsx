import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <s-page heading="Pickup Phone Validator">
      <s-section heading="Estado de la validación">
        <s-stack direction="block" gap="base">
          <s-stack direction="inline" gap="base">
            <s-text>Estado:</s-text>
            <s-badge tone="success" icon="check-circle">
              Activa
            </s-badge>
          </s-stack>

          <s-paragraph>
            La aplicación exige un número de teléfono cuando el cliente
            selecciona retiro en tienda.
          </s-paragraph>
        </s-stack>
      </s-section>

      <s-section heading="Regla">
        <s-stack direction="block" gap="base">
          <s-paragraph>
            <strong>Condición:</strong> Retiro en tienda (Pickup)
          </s-paragraph>

          <s-paragraph>
            <strong>Campo requerido:</strong> Teléfono de facturación
          </s-paragraph>

          <s-paragraph>
            <strong>Mensaje:</strong> Ingresa un número de teléfono para
            continuar.
          </s-paragraph>
        </s-stack>
      </s-section>

      <s-section heading="Configuración">
        <s-paragraph>
          La validación debe estar activada en Configuración → Checkout →
          Reglas de checkout.
        </s-paragraph>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};