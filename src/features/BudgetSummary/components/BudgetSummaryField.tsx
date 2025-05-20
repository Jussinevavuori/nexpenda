import { Icon } from "@/components/Icon/Icon";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { formatMoney } from "@/utils/currency/formatMoney";
import { c } from "@/utils/generic/classnames";

export type BudgetSummaryFieldProps = {
  title: string;
  value: number | string;
  type: "default" | "money" | "percentage";
  description: string;
  color: "success" | "danger" | "neutral" | "auto" | "auto-flipped";
};

export function BudgetSummaryField(props: BudgetSummaryFieldProps) {
  return (
    <Tooltip
      value={
        <div className="p-2 max-w-xs">
          <div className="flex items-center gap-4">
            <Icon.Material icon="info" className="text-primary" />
            <p className="font-semibold">{props.title}</p>
          </div>
          <p className="pt-2 text-sm text-black-3 dark:text-white-3 italic">
            {props.description}
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-2 items-start">
        <p className="text-sm text-black-3 dark:text-white-3">{props.title}</p>
        <p
          className={c(
            "text-2xl font-semibold",
            c.variant(props.color)({
              success: "text-success",
              danger: "text-danger",
              neutral: "",
              auto:
                props.value === 0
                  ? ""
                  : typeof props.value === "number" && props.value > 0
                  ? "text-success"
                  : "text-danger",
              "auto-flipped":
                props.value === 0
                  ? ""
                  : typeof props.value === "number" && props.value > 0
                  ? "text-danger"
                  : "text-success",
            })
          )}
        >
          {(() => {
            switch (props.type) {
              case "default":
                return props.value;
              case "money":
                if (typeof props.value !== "number") {
                  throw new Error(
                    "BudgetSummaryField with type money must be provided a numeric value"
                  );
                }
                return formatMoney(props.value);
              case "percentage":
                if (typeof props.value !== "number") {
                  throw new Error(
                    "BudgetSummaryField with type money must be provided a numeric value"
                  );
                }
                return props.value.toFixed(0) + " %";
            }
          })()}
        </p>
      </div>
    </Tooltip>
  );
}
