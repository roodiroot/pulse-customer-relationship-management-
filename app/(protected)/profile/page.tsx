"use client";

import UserInfo from "@/components/user-info";
import ColTwoContainer from "@/components/utils/col-two-container";
import Container from "@/components/utils/container";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <Container>
      <ColTwoContainer>
        <UserInfo label="Client" user={user} />
      </ColTwoContainer>
    </Container>
  );
};

export default ClientPage;
