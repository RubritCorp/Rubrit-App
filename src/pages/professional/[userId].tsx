import ProfessionalLanding from "../../components/ProfessionalLanding";

import { useRouter } from "next/router";

const UserLanding: any = () => {
  const { query } = useRouter();
  return (
    <>
      <ProfessionalLanding user={`${query.userId}`} />
    </>
  );
};

export default UserLanding;
