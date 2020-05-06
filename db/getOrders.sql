SELECT os.state, time(o.creation_datetime) creation_time, o.id, pro.name, odhp.product_quantity, p.method, od.total,
 u.full_name, u.full_address
FROM `order` o
JOIN user u ON o.id_user = u.id
JOIN order_state os ON o.id_state = os.id
JOIN payment p ON o.id_payment = p.id
JOIN order_detail od ON o.id = od.id_order
JOIN order_detail_has_product odhp ON odhp.order_detail_id = od.id
JOIN product pro ON pro.id = odhp.product_id
ORDER BY creation_time desc




