import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import { IUserChat } from "../../context/ChatProvider";

const UserBadgeItem: React.FC<{
  user: IUserChat;
  handleFunction: any;
  // admin: string;
}> = ({
  user,
  handleFunction,
  // admin
}) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="medium_green_sub"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {/* {admin === user._id && <span> (Admin)</span>} */}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
