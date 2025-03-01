interface SemanticSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  titleLevel?: 2 | 3 | 4;
  className?: string;
  titleClassName?: string;
}

export function SemanticSection({
  id,
  title,
  children,
  titleLevel = 2,
  className = "",
  titleClassName = "",
}: SemanticSectionProps) {
  const HeadingTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={className}
    >
      <HeadingTag 
        id={`${id}-heading`}
        className={titleClassName}
      >
        {title}
      </HeadingTag>
      {children}
    </section>
  );
} 