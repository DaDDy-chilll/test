import ApiService from "@/networks/services";

const deleteAddress = (addressId: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    ApiService.user
      .delete(`/delivery_address/${addressId}`)
      .then(() => {
        resolve("deleted");
      })
      .catch(() => {
        reject("error");
      });
  });
};

export default deleteAddress;