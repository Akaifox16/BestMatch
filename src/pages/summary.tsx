import CustomHeader from "@component/CustomHeader";
import ProfileCard from "@component/ProfileCard";

const summary = () => {
  return (
    <div>
      <CustomHeader pageName='summary' />

      <main>
        <ProfileCard variant='summary' />
      </main>
    </div>
  );
}

export default summary;