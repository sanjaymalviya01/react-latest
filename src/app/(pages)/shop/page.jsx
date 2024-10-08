import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import ShopWrapper from "../../components/Wrapper/ShopWrapper";

async function page({ searchParams }) {
  let allpro, productsByCategory, productsByBrand, highestPrice, lowestPrice;
  if (!Object.keys(searchParams).length) {
    allpro = await fetchAllProducts();
    if (allpro) {
      productsByCategory = allpro.reduce((arrayCategory, product) => {
        if (product.category !== undefined) {
          arrayCategory[product.category] =
            (arrayCategory[product.category] || 0) + 1;
        }
        return arrayCategory;
      }, {});

      productsByBrand = allpro.reduce((arrayBrand, product) => {
        if (product.brand !== undefined) {
          arrayBrand[product.brand] = (arrayBrand[product.brand] || 0) + 1;
        }
        return arrayBrand;
      }, {});

      highestPrice = Math.max(...allpro.map((product) => product.price));
      lowestPrice = Math.min(...allpro.map((product) => product.price));
    }
  }
  return (
    <>
      <BreadCrumb />
      <ShopWrapper
        {...{
          allpro,
          productsByCategory,
          productsByBrand,
          highestPrice,
          lowestPrice,
        }}
      />
    </>
  );
}

export default page;

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=200`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
