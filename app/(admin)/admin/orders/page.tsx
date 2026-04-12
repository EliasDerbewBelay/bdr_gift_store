import React from "react";
import OrderManagement from "@/components/admin/OrderManagement";
import { getOrders } from "@/lib/actions/admin";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="w-full">
      <OrderManagement 
        initialOrders={orders} 
      />
    </div>
  );
}
