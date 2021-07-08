import AuthenticationService from "../services/AuthenticationService";

export default class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  public async signIn(req: any, res: any) {
    try {
      const response = await this.authService.signIn(req.body);
      res.status(200).send(response);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .send({ message: err.message, statusCode: err.statusCode });
    }
  }

  public async signUp(req: any, res: any) {
    try {
      const response = await this.authService.signUp(req.body);
      res.status(200).send(response);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .send({ message: err.message, statusCode: err.statusCode });
    }
  }
}
