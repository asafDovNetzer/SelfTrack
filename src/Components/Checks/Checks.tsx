import Checkbox from "@material-ui/core/Checkbox";

const Checks: React.FC<{
  checks: any;
}> = ({ checks }) => {
  console.log(checks);
  return (
    <div
      style={{
        borderRight: `1px solid gray`,
        borderLeft: `1px solid gray`,
      }}
    >
      {checks.map((element: any) => {
        return (
          <Checkbox
            checked={element.isChecked}
            size="small"
            onChange={() => {}}
            //   className="main-button"
            disabled
            color={element.color}
          />
        );
      })}
    </div>
  );
};

export default Checks;
