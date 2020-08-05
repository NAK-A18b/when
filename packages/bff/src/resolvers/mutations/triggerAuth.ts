import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { UserInputError } from "apollo-server-errors";
import { GraphQLFieldResolver } from "graphql";

import { randomCode, sendMessage } from "../../utils";
import { Context } from "../../typings";

import { createUser, findUserByTel, updateUser } from "../../entitys/user";

const authCodeNotification = (tel: string, authCode: number) => {
  console.info(`Creating auth code ${authCode} for ${tel}`);
  sendMessage(
    tel,
    `👋 Dein Anmeldecode lautet *${authCode}* und ist eine Minute lang gültig`
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
    const authCode = randomCode();

    if (!user) {
      await createUser({ authCode, tel });
    } else {
      await updateUser({ ...user, authCode });
    }

    authCodeNotification(tel, authCode);
    return tel;
  } else {
    throw new UserInputError("Error on AuthTrigger", {
      BAD_PHONE_NUMBER: true
    });
  }
};
