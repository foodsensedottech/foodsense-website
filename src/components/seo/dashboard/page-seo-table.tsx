import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pages = [
  {
    name: "Home",
    status: "Good",
    score: 92,
    lastUpdated: "2024-03-20",
  },
  {
    name: "About",
    status: "Review",
    score: 78,
    lastUpdated: "2024-03-19",
  },
  {
    name: "Services",
    status: "Good",
    score: 88,
    lastUpdated: "2024-03-18",
  },
  {
    name: "Blog",
    status: "Good",
    score: 95,
    lastUpdated: "2024-03-20",
  },
];

export function PageSEOTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.name}>
              <TableCell className="font-medium">{page.name}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    page.status === "Good"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {page.status === "Good" ? "✅" : "⚠️"} {page.status}
                </span>
              </TableCell>
              <TableCell>{page.score}</TableCell>
              <TableCell>{page.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 