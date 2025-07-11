const BASE_URL: string = "https://importer-be.onrender.com";

const authHeaders = (token: string) => {
  const AUTH_HEADERS: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return AUTH_HEADERS;
};

// import product to shopify
export const importShopifyProduct = async (payload: {
  data: any;
  token: string;
}) => {
  try {
    const URL = `${BASE_URL}/routes/addProduct`;

    const res = await fetch(URL, {
      method: "POST",
      headers: authHeaders(payload.token),
      body: JSON.stringify(payload.data),
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// delete product
export const deleteShopifyProduct = async (payload: {
  id: string | null;
  token: string;
}) => {
  try {
    const URL = `${BASE_URL}/routes/deleteProduct/${payload.id}`;

    const res = await fetch(URL, {
      method: "DELETE",
      headers: authHeaders(payload.token),
    });

    if (!res.ok) {
      throw new Error(`Delete failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
};

// update shopify products
export const updateShopifyProduct = async (payload: {
  id: string | null;
  data: any;
  token: string;
}) => {
  try {
    const url = `${BASE_URL}/routes/updateProduct/${payload.id}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: authHeaders(payload.token),
      body: JSON.stringify(payload.data),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchShopifyGraphQl = async (
  sku: string | undefined,
  token: string,
) => {
  try {
    const url = `${BASE_URL}/routes/shopifyGraphiql`;

    const query = `
      {
        productVariants(first: 1, query: "${sku}") {
          edges {
            node {
              id
              sku
              product {
                id
                createdAt
                updatedAt
              }
            }
          }
        }
      }
    `;

    const res = await fetch(url, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ query }),
    });

    const shopifyData = await res.json();

    const edges = shopifyData?.data?.productVariants?.edges;

    if (edges && edges.length > 0) {
      const product = edges[0].node.product;
      return product;
    } else {
      console.log("No product variants found for query:", sku);
    }
  } catch (error) {
    console.error("GraphQL fetch error:", error);
  }
};

// Get all imported products
export const fetchImportedProducts = async (token: string) => {
  try {
    const URL = `${BASE_URL}/routes/getImportedProducts`;
    const AUTH_HEADERS: HeadersInit = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(URL, {
      method: "GET",
      headers: AUTH_HEADERS,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
