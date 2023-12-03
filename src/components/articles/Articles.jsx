import { useState } from "react";
import ArticleItem from "./ArticleItem";
const [products, setProducts] = useState([]);

const fetchProducts = async () => {
  try {
    const data = await ProductsService.getProducts();
    setProducts(data);
  } catch (error) {
    console.error('Erreur lors de la récupération du Product:', error);
  }
};


const items = [
    {
      id: 1,
      name: "Fila Disruptor Low",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 109.90,
    },
    {
      id: 2,
      name: "Le Coq Sportif Nylon/Gum",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 119.90,
    },
    {
      id: 3,
      name: "New Balance WL574 CRD",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 104.90,
    },
    {
      id: 4,
      name: "Le Coq Sportif Noah Club OG",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 94.90,
    },
    {
      id: 5,
      name: "Reebok Club C 85 MU",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 99.90,
    },
  ];

  const title = "Meilleures ventes"
  
  const Articles = () => (
    <div>
      <ArticleItem items={items} title={title}/>
    </div>
  );
  
  export default Articles;
  