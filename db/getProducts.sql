SELECT DISTINCT o.id Order_id, concat(odhp.product_quantity, 'x ', p.name) Description, p.id Product_id
FROM `order` o 
JOIN order_detail od ON o.id = od.id_order
JOIN order_detail_has_product odhp ON odhp.order_detail_id = od.id
JOIN product p ON p.id = odhp.product_id
ORDER BY o.id
