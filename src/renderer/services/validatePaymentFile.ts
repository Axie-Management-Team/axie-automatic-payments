import Joi from 'joi';

const validatePaymentFile = (paymentsOrigin) => {
  // Check it's valid
  const manager = paymentsOrigin.Manager;
  if (!(manager.length === 46 && manager.startsWith('ronin:'))) {
    throw new Error('Invalid Manager');
  }

  const scholarSchema = Joi.object({
    Name: Joi.string(),
    AccountAddress: Joi.string()
      .pattern(new RegExp('^ronin:'))
      .length(46)
      .required(),
    ScholarPayoutAddress: Joi.string()
      .pattern(new RegExp('^ronin:'))
      .length(46)
      .required(),
    ScholarPayout: Joi.number().greater(0),
    ScholarPercent: Joi.number().less(100).required(),
    TrainerPayoutAddress: Joi.string()
      .pattern(new RegExp('^ronin:'))
      .length(46),
    TrainerPercent: Joi.number().less(100),
    TrainerPayout: Joi.number().greater(0),
  })
    .with('TrainerPayoutAddress', 'TrainerPercent')
    .with('TrainerPercent', 'TrainerPayoutAddress')
    .with('TrainerPayout', 'TrainerPayoutAddress');

  paymentsOrigin.Scholars.forEach((payment) => {
    const validation = scholarSchema.validate(payment, { allowUnknown: true });

    if (validation.error) {
      throw new Error(`Invalid Format in Scholars. Error: ${validation.error}`);
    }
  });
};

export default validatePaymentFile;
