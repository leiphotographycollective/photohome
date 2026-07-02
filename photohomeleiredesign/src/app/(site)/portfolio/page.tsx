import { redirect } from "next/navigation";

// The portfolio index lives on the Work page; deep links land on
// /portfolio/[cat] and /portfolio/[cat]/[id].
export default function PortfolioIndex() {
  redirect("/work");
}
