type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`space-y-2 ${alignment}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-[#8f1e2d]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-[#1f2a44]">{title}</h2>
      {description ? (
        <p className="text-sm text-[#5f677a]">{description}</p>
      ) : null}
    </div>
  );
}
