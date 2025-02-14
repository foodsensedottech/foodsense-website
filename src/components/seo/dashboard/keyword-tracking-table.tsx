import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const keywords = [
  {
    keyword: "restaurant tech",
    position: 3,
    trend: "+2",
    searchVolume: "1.2k/mo",
  },
  {
    keyword: "food analytics",
    position: 5,
    trend: "-1",
    searchVolume: "890/mo",
  },
  {
    keyword: "menu optimization",
    position: 2,
    trend: "+3",
    searchVolume: "750/mo",
  },
];

export function KeywordTrackingTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Keyword</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead>Search Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keywords.map((kw) => (
            <TableRow key={kw.keyword}>
              <TableCell className="font-medium">{kw.keyword}</TableCell>
              <TableCell>#{kw.position}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    kw.trend.startsWith("+")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {kw.trend.startsWith("+") ? "↑" : "↓"} {kw.trend}
                </span>
              </TableCell>
              <TableCell>{kw.searchVolume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 