import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariables } from '../../env.schema';

export function envValidator(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    validationError: { target: false },
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
