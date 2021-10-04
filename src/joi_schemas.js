const Joi = require('joi');

const scholarsSchema = Joi.object({
  Name: Joi.string().alphanum(),
  AccountAddress: Joi.string()
    .alphanum()
    .pattern(new RegExp('^ronin:'))
    .min(46)
    .max(46)
    .required(),
  ScholarPayoutAddress: Joi.string()
    .alphanum()
    .pattern(new RegExp('^ronin:'))
    .min(46)
    .max(46)
    .required(),
  ScholarPayout: Joi.number().greater(1).required(),
  ManagerPayout: Joi.string().number().greater(1).required(),
  TrainerPayoutAddress: Joi.string()
    .alphanum()
    .pattern(new RegExp('^ronin:'))
    .min(46)
    .max(46),
  TrainerPayout: Joi.number().greater(1),
})
  .with('TrainerPayoutAddress', 'TrainerPayout')
  .with('TrainerPayout', 'TrainerPayoutAddress');

scholarsSchema.validate({});

try {
  const value = await scholarsSchema.validateAsync({});
  console.log(value);
} catch (err) {
  console.error(err);
}
