import FormField from "./FormField";
import FormLabel from "./FormLabel";
import FormNumberInput from "./FormNumberInput";

const BreatheCycleDuration = () => {
  const handleInDurationChange = (duration: number) => {
    console.log("from handleIn", { duration });
  };

  const handleOutDurationChange = (duration: number) => {
    console.log("from handleIn", { duration });
  };

  return (
    <form>
      <FormField>
        <FormLabel name="breathe-in">Breathe in</FormLabel>
        <FormNumberInput
          name="breathe-in"
          onValueChange={handleInDurationChange}
        />
        <span className="text-white">seconds</span>
      </FormField>
      <FormField>
        <FormLabel name="breathe-out">Breathe out</FormLabel>
        <FormNumberInput
          name="breathe-out"
          onValueChange={handleOutDurationChange}
        />
        <span className="text-white">seconds</span>
      </FormField>
    </form>
  );
};

export default BreatheCycleDuration;
