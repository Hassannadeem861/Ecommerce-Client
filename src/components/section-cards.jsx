import { useState, useEffect } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { getAllProjects } from "../utils/project-award-api.js";
export function SectionCards({ projects }) {
  
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [awardProject, setAwardProjects] = useState(0);
  const [notAwardProject, setNotAwardProjects] = useState(0);
  const [totalProjectsBudget, setTotalProjectsBudge] = useState(0);

  useEffect(() => {
    if (projects?.length) {      
      const awarded = projects.filter((p) => p.award === 1);
      const notAwarded = projects.filter((p) => p.award === 0);

      const awardSum = awarded.reduce(
        (acc, curr) => acc + (curr.budget || 0),
        0
      );
      const notAwardSum = notAwarded.reduce(
        (acc, curr) => acc + (curr.budget || 0),
        0
      );
      const total = awardSum + notAwardSum;

      setAwardProjects(awardSum);
      setNotAwardProjects(notAwardSum);
      setTotalProjectsBudge(total);
    }
  }, [projects]);

  // const loadItems = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await getAllProjects();

  //     const projects = data.projects || [];

  //     const awarded = projects.filter((data) => {
  //       return data.award === 1;
  //     });

  //     const notAwarded = projects.filter((data) => {
  //       return data.award === 0;
  //     });

  //     const awardSum = awarded.reduce((acc, curr) => {
  //       return acc + (curr.budget || 0);
  //     }, 0);

  //     const notAwardSum = notAwarded.reduce((acc, curr) => {
  //       return acc + (curr.budget || 0);
  //     }, 0);

  //     const totalSum = awardSum + notAwardSum;

  //     setAwardProjects(awardSum);
  //     setNotAwardProjects(notAwardSum);
  //     setTotalProjectsBudge(totalSum);
  //   } catch (error) {
  //     console.error("Error loading items:", error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Awarded Projects</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {awardProject.toLocaleString()}
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Not Awarded Projects</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {notAwardProject.toLocaleString()}
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Projects Amount</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalProjectsBudget.toLocaleString()}
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      {/* <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card> */}
    </div>
  );
}
