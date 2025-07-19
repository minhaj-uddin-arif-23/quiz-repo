import AdminPositionForm from "@/components/AdminForms/AdminPositionForm";

export default function PositionsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Positions</h1>
      <AdminPositionForm />
    </div>
  );
}