import classNames from 'classnames';

// Utility for if-elseif-else conditions
class ConditionalClassnames {
  private ifRule: { condition: any; args: any[] };
  private elifRules: Array<{ condition: any[]; args: any[] }>;
  private elseRule?: { args: any[] };

  constructor(condition: any, ...args: any[]) {
    this.ifRule = { condition, args };
    this.elifRules = [];
    this.elseRule = undefined;
  }

  elseIf(condition: any) {
    return (...args: any[]) => {
      this.elifRules.push({ condition, args });
      return this;
    };
  }

  else(...args: any[]) {
    this.elseRule = { args };
    return this.toString();
  }

  toString() {
    if (this.ifRule.condition) return classNames(this.ifRule.args);
    for (const elifRule of this.elifRules) {
      if (elifRule.condition) return classNames(elifRule.args);
    }
    if (this.elseRule) return classNames(this.elseRule.args);
    return "";
  }
}

// Utility for variants with default properties

class VariantClassnames<V extends string> {
  private variant: V;
  private variantArgs: Partial<Record<V, any | any[]>>;
  private defaultArgs: any[];

  constructor(variant: V, variantArgs: Partial<Record<V, any[]>>) {
    this.variant = variant;
    this.variantArgs = variantArgs;
    this.defaultArgs = [];
  }

  default(...args: any[]) {
    this.defaultArgs = args;
    return this.toString();
  }

  toString() {
    return classNames(this.variantArgs[this.variant] ?? this.defaultArgs);
  }
}

interface C {
  (...args: any[]): string;
  create: (...args: any[]) => (...args: any[]) => string;
  variant<V extends string>(
    v: V
  ): (variantArgs: VariantClassnames<V>["variantArgs"]) => VariantClassnames<V>;
  if: (arg: any) => (...args: any[]) => ConditionalClassnames;
}

export const c = <C>function (...args: any[]) {
  return classNames(...args);
};

c.create = (...args1: any[]) =>
  function (...args2: any[]) {
    return classNames(...args1, ...args2);
  };

c.variant = <V extends string>(v: V) => {
  return (variantArgs: VariantClassnames<V>["variantArgs"]) =>
    new VariantClassnames(v, variantArgs);
};

c.if = (condition: any) => {
  return (...args: any[]) => new ConditionalClassnames(condition, ...args);
};
