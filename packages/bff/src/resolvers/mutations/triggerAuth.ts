import { sendMessage } from "../../utils";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { UserInputError } from "apollo-server-errors";

import { randomToken } from "../../utils";
import { Context } from "../../typings";
import { GraphQLFieldResolver } from "graphql";

import { createUser, findUserByTel, updateUser } from "../../entitys/user";

const tokenNotification = (tel: string, token: number) => {
  console.info(`Creating auth code ${token} for ${tel}`);
  sendMessage(
    tel,
    `👋 Dein Anmeldecode lautet *${token}* und ist eine Minute lang gültig`
  );
};

type MutationPayload = {
  tel: string;
};

export const triggerAuth: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { tel }) => {
  const phoneNumber = parsePhoneNumberFromString(tel, "DE");
  if (
    phoneNumber &&
    phoneNumber.isValid() &&
    phoneNumber.getType() === "MOBILE"
  ) {
    tel = phoneNumber.number.substr(1);
    const user = await findUserByTel(tel);
    const token = randomToken();

    if (!user) {
      await createUser({ token, tel });
    } else {
      await updateUser({ ...user, token });
    }

    tokenNotification(tel, token);
    return tel;
  } else {
    throw new UserInputError("Error on AuthTrigger", {
      BAD_PHONE_NUMBER: true
    });
  }
};
