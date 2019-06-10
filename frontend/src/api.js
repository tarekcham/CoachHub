export const getItemsApi = async () => {
  const items = await fetch("/api/items");
  const result = await items.json();

  return result;
};

export const addItemApi = async data => {
  await fetch(`/api/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

export const deleteItemApi = async id => {
  await fetch(`api/items/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};

export const updateItemApi = async (id, data) => {
  await fetch(`api/items/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};
