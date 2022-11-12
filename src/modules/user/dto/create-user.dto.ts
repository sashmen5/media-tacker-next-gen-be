export class CreateUserDto {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly collectionId: string;
}

// TODO: add collection ID to user and inside JWT TOKEN
