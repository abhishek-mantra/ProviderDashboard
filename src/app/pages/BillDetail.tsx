import { useParams, Navigate } from "react-router";

export function BillDetail() {
  const { billId } = useParams();
  return <Navigate to={`/billing/bills/${billId || "bill-1"}/invoice`} replace />;
}
