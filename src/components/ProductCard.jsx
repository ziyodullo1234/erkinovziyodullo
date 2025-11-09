import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="hover:shadow-2xl shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 bg-white hover:-translate-y-1">
        <CardContent className="p-5 flex flex-col items-center">
          {/* Image section */}
          <motion.img
            src={
              !imgError && product.image
                ? product.image
                : "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={product.name || "Product Image"}
            onError={() => setImgError(true)}
            className="rounded-xl mb-4 w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          />

          {/* Product name */}
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-1">
            {product.name || "Unnamed Product"}
          </h2>

          {/* Price */}
          <p className="text-gray-500 mb-4 text-sm font-medium">
            ${product.price || "—"}
          </p>

          {/* Add to Cart Button */}
          <motion.div whileTap={{ scale: 0.95 }} className="w-full">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium py-2 shadow-md transition-all duration-300">
              🛒 Add to Cart
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ProductCard;
