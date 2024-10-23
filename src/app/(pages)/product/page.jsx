import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import ProductDetail from "./comp/ProductDetail";
import ProductDescription from "./comp/ProductDescription";
import Product from "../../components/Product/Product";
import { redirect } from "next/navigation";

async function page({ searchParams }) {
  let productId = searchParams.productId;
  let product;
  if (Object.keys(searchParams).length) {
    product = await productData(productId);
  } else {
    redirect(`/shop`);
  }
  console.log(searchParams);
  return (
    <>
      {product && (
        <>
          <BreadCrumb />
          <ProductDetail product={product} />
          <ProductDescription product={product} />
          <Product product={product} />
        </>
      )}
    </>
  );
}

export default page;

async function productData(a) {
  let data = await fetch(`https://dummyjson.com/products/${a}`);
  data = await data.json();
  return data;
}
