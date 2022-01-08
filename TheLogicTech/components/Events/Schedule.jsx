import Calender from "../Calender/Calender";

const Schedule = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl relative montserrat font-semibold text-center text-gradient capitalize md:text-4xl underline">
				Schedule Event
			</div>
      <Calender/>
    </div>
  );
};

export default Schedule;

