export default function TableHeader() {
  return (
    <thead className="bg-gray-50 text-gray-500">
      <tr className="border-b">
        <th className="px-4 py-3 text-left">
          <input type="checkbox" />
        </th>

        <th className="px-4 py-3 text-left font-medium">NAME</th>
        <th className="px-4 py-3 text-left font-medium">HEALTH</th>
        <th className="px-4 py-3 text-left font-medium">LOCATION</th>
        <th className="px-4 py-3 text-left font-medium">RECORDER</th>
        <th className="px-4 py-3 text-left font-medium">TASKS</th>
        <th className="px-4 py-3 text-left font-medium">STATUS</th>
        <th className="px-4 py-3 text-center font-medium">ACTIONS</th>
      </tr>
    </thead>
  );
}
