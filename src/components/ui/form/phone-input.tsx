"use client";

import * as React from "react";
import {
  AsYouType,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import { Input } from "@/components/ui/form/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  flagEmoji,
} from "@/lib/constants/phone-countries";
import { cn } from "@/lib/utils";

function toE164(country: CountryCode, nationalInput: string): string {
  const pasted = parsePhoneNumberFromString(nationalInput);
  if (pasted?.number) return pasted.number;

  const digits = nationalInput.replace(/\D/g, "");
  if (!digits) return "";

  const parsed = parsePhoneNumberFromString(digits, country);
  if (parsed?.number) return parsed.number;

  return `+${getCountryCallingCode(country)}${digits}`;
}

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
  className?: string;
}

export function PhoneInput({
  value = "",
  onChange,
  onBlur,
  id,
  disabled,
  className,
  ...aria
}: PhoneInputProps) {
  const lastEmitted = React.useRef(value);
  const parsedValue = value ? parsePhoneNumberFromString(value) : undefined;
  const [country, setCountry] = React.useState<CountryCode>(
    parsedValue?.country || DEFAULT_PHONE_COUNTRY
  );
  const [national, setNational] = React.useState(() => {
    if (!parsedValue) return "";
    return new AsYouType(parsedValue.country || DEFAULT_PHONE_COUNTRY).input(
      parsedValue.nationalNumber
    );
  });

  React.useEffect(() => {
    if (value === lastEmitted.current) return;
    lastEmitted.current = value;
    if (!value) {
      setNational("");
      return;
    }
    const parsed = parsePhoneNumberFromString(value);
    if (!parsed) return;
    if (parsed.country) setCountry(parsed.country);
    setNational(
      new AsYouType(parsed.country || country).input(parsed.nationalNumber)
    );
  }, [value, country]);

  const emit = (nextCountry: CountryCode, raw: string) => {
    if (raw.includes("+")) {
      const parsed = parsePhoneNumberFromString(raw);
      if (parsed?.country) {
        setCountry(parsed.country);
        const formatted = new AsYouType(parsed.country).input(
          parsed.nationalNumber
        );
        setNational(formatted);
        lastEmitted.current = parsed.number;
        onChange?.(parsed.number);
        return;
      }
    }

    const formatted = new AsYouType(nextCountry).input(raw.replace(/\D/g, ""));
    setNational(formatted);
    const e164 = toE164(nextCountry, formatted);
    lastEmitted.current = e164;
    onChange?.(e164);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Select
        value={country}
        onValueChange={(next) => {
          const nextCountry = next as CountryCode;
          setCountry(nextCountry);
          emit(nextCountry, national.replace(/\D/g, ""));
        }}
        disabled={disabled}
      >
        <SelectTrigger
          className="h-10 w-[3.75rem] min-w-[3.75rem] shrink-0 px-1.5 text-xs font-medium"
          aria-label="Country calling code"
        >
          <SelectValue>
            <span className="inline-flex items-center gap-0.5 whitespace-nowrap">
              {flagEmoji(country)} {country}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {PHONE_COUNTRIES.map((item) => (
            <SelectItem key={item.iso} value={item.iso}>
              {flagEmoji(item.iso)} {item.iso} +{getCountryCallingCode(item.iso)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="305 555 0100"
        value={national}
        disabled={disabled}
        onChange={(event) => emit(country, event.target.value)}
        onBlur={onBlur}
        className="flex-1"
        {...aria}
      />
    </div>
  );
}
