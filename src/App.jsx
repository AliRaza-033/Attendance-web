import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const PERCENTAGE_OPTIONS = ["60", "65", "70", "75", "80", "85", "90"];

function App() {
  const [percentage, setPercentage] = useState("75");
  const [present, setPresent] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const parseWholeNumber = (value) => {
    if (value.trim() === "") return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return null;
    return parsed;
  };

  const handleCalculate = (event) => {
    event.preventDefault();

    const presentValue = parseWholeNumber(present);
    const totalValue = parseWholeNumber(total);
    const percentageValue = Number(percentage);

    if (presentValue === null || totalValue === null) {
      setError("Please enter valid whole numbers.");
      setResult(null);
      return;
    }

    if (totalValue <= 0) {
      setError("Total sessions must be greater than 0.");
      setResult(null);
      return;
    }

    if (presentValue < 0) {
      setError("Present sessions cannot be negative.");
      setResult(null);
      return;
    }

    if (presentValue > totalValue) {
      setError("Present sessions cannot be greater than total sessions.");
      setResult(null);
      return;
    }

    if (!Number.isFinite(percentageValue)) {
      setError("Please select a valid percentage.");
      setResult(null);
      return;
    }

    if (presentValue / totalValue >= percentageValue / 100) {
      const daysAvailableToBunk = Math.floor(
        (100 * presentValue - percentageValue * totalValue) / percentageValue,
      );
      setResult({
        type: "bunk",
        daysAvailableToBunk,
        present: presentValue,
        total: totalValue,
        percentage: percentageValue,
      });
      setError("");
      return;
    }

    const attendanceNeeded = Math.ceil(
      (percentageValue * totalValue - 100 * presentValue) /
        (100 - percentageValue),
    );
    setResult({
      type: "attend",
      attendanceNeeded,
      present: presentValue,
      total: totalValue,
      percentage: percentageValue,
    });
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="mx-auto w-full max-w-2xl px-4 py-6 text-center sm:py-8 sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            Attendance Calculator
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:py-8">
        <Card className="shadow-sm">
          <CardHeader className="space-y-1 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">
              Calculate your attendance
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Enter your current attendance and required percentage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6 sm:pt-0">
            <form className="space-y-3 sm:space-y-4" onSubmit={handleCalculate}>
              <div className="grid gap-2">
                <Label htmlFor="percentage">Percentage Required</Label>
                <Select value={percentage} onValueChange={setPercentage}>
                  <SelectTrigger id="percentage">
                    <SelectValue placeholder="Select percentage" />
                  </SelectTrigger>
                  <SelectContent>
                    {PERCENTAGE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="present">Present</Label>
                  <Input
                    id="present"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    placeholder="e.g. 20"
                    value={present}
                    onChange={(event) => setPresent(event.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="total">Total</Label>
                  <Input
                    id="total"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    placeholder="e.g. 28"
                    value={total}
                    onChange={(event) => setTotal(event.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </form>

            <Separator />

            {error ? (
              <div
                role="alert"
                className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm leading-relaxed text-destructive"
              >
                {error}
              </div>
            ) : null}

            {!error && result ? (
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed break-words">
                {result.type === "bunk" ? (
                  <>
                    <p>
                      You can bunk for{" "}
                      <span className="font-semibold text-foreground">
                        {result.daysAvailableToBunk}
                      </span>{" "}
                      more days.
                    </p>
                    <p>
                      Current Attendance:{" "}
                      <span className="font-semibold text-foreground">
                        {result.present}/{result.total}
                      </span>{" "}
                      -&gt;{" "}
                      <span className="font-semibold text-foreground">
                        {((result.present / result.total) * 100).toFixed(2)}%
                      </span>
                    </p>
                    <p>
                      Attendance Then:{" "}
                      <span className="font-semibold text-foreground">
                        {result.present}/
                        {result.total + result.daysAvailableToBunk}
                      </span>{" "}
                      -&gt;{" "}
                      <span className="font-semibold text-foreground">
                        {(
                          (result.present /
                            (result.total + result.daysAvailableToBunk)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      You need to attend{" "}
                      <span className="font-semibold text-foreground">
                        {result.attendanceNeeded}
                      </span>{" "}
                      more classes to attain {result.percentage}% attendance.
                    </p>
                    <p>
                      Current Attendance:{" "}
                      <span className="font-semibold text-foreground">
                        {result.present}/{result.total}
                      </span>{" "}
                      -&gt;{" "}
                      <span className="font-semibold text-foreground">
                        {((result.present / result.total) * 100).toFixed(2)}%
                      </span>
                    </p>
                    <p>
                      Attendance Required:{" "}
                      <span className="font-semibold text-foreground">
                        {result.present + result.attendanceNeeded}/
                        {result.total + result.attendanceNeeded}
                      </span>{" "}
                      -&gt;{" "}
                      <span className="font-semibold text-foreground">
                        {(
                          ((result.present + result.attendanceNeeded) /
                            (result.total + result.attendanceNeeded)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </p>
                  </>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-2 px-4 py-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:py-6 sm:text-left">
          <span>Attendance Calculator</span>
          <a
            className="font-medium text-foreground underline-offset-4 hover:underline"
            href="https://ali-raza.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Made by Ali Raza
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
