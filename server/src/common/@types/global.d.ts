import { UserEntity } from '@database/entities/user.entity';
import { Config as ConfigInterface } from '@libs/config/config.interface';

import type {
  BusinessContact as TBusinessContact,
  Chat as TChat,
  ClientInfo as TClientInfo,
  Contact as TContact,
  GroupChat as TGroupChat,
  Location as TLocation,
  Message as TMessage,
  MessageMedia as TMessageMedia,
  PrivateChat as TPrivateChat,
  PrivateContact as TPrivateContact,
  GroupNotification as TGroupNotification,
  Label as TLabel,
  Order as TOrder,
  Product as TProduct,
  Call as TCall,
  Buttons as TButtons,
  List as TList,
  Payment as TPayment,
  Reaction as TReaction,
} from 'whatsapp-web.js';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserEntity;
      realIp: string;
      body: Record<string, any>;
      ip: string;
      ips: string[];
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'test' | 'staging' | 'prod';
      APP_PORT: number;
      APP_PREFIX: string;
      APP_NAME: string;
      API_URL: string;
      CLIENT_URL: string;
      ALLOWED_ORIGINS?: string;

      DB_HOST: string;
      DB_PORT: string;
      DB_DATABASE: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_LOGGING: boolean;

      SWAGGER_USER: string;
      SWAGGER_PASSWORD: string;

      DEFAULT_USER_PASSWORD: string;

      JWT_ACCESS_EXPIRY: string;
      JWT_REFRESH_EXPIRY: string;
      JWT_SECRET: string;
      TOKEN_TYPE: string;

      THROTTLE_LIMIT: number;
      THROTTLE_TTL: number;
    }
  }

  export type I18nTranslations = {
    exception: {
      itemExists: string;
      itemDoesNotExist: string;
      unauthorized: string;
      internalError: string;
      otpRequired: string;
      usernameRequired: string;
      followerFollowingSame: string;
      invalidOTP: string;
      inactiveUser: string;
      invalidCredentials: string;
      invalidTwoFaCode: string;
      forbidden: string;
      userInactive: string;
      userBlocked: string;
      notFound: string;
      itemExpired: string;
      emailLooksGood: string;
      unsupportedFileType: string;
      incorrectOldPassword: string;
      badRequest: string;
      invalidRefreshToken: string;
      deleteDefaultError: string;
      tooManyTries: string;
      refreshToken: string;
      token: string;
      tooManyRequests: string;
      invalidCursor: string;
      cursorInvalidDate: string;
      cursorInvalidNumber: string;
      apiUnauthorizedResponse: string;
      tooManyRequest: string;
    };
    validation: {
      isNotEmpty: string;
      maxLength: string;
      minLength: string;
      max: string;
      min: string;
      isPassword: string;
      isIn: string;
      isEnum: string;
      isDataType: string;
    };
  };
  export type Configs = ConfigInterface;
}

declare module 'whatsapp-web.js/src/structures' {
  export interface BusinessContact {
    (): TBusinessContact;
  }
  export interface Chat {
    (): TChat;
  }
  export interface ClientInfo {
    (): TClientInfo;
  }
  export interface Contact {
    (): TContact;
  }
  export interface GroupChat {
    (): TGroupChat;
  }
  export interface Location {
    (): TLocation;
  }
  export interface Message {
    (): TMessage;
  }
  export interface MessageMedia {
    (): TMessageMedia;
  }
  export interface PrivateChat {
    (): TPrivateChat;
  }
  export interface PrivateContact {
    (): TPrivateContact;
  }
  export interface GroupNotification {
    (): TGroupNotification;
  }
  export interface Label {
    (): TLabel;
  }
  export interface Order {
    (): TOrder;
  }
  export interface Product {
    (): TProduct;
  }
  export interface Call {
    (): TCall;
  }
  export interface Buttons {
    (): TButtons;
  }
  export interface List {
    (): TList;
  }
  export interface Payment {
    (): TPayment;
  }
  export interface Reaction {
    (): TReaction;
  }
}
