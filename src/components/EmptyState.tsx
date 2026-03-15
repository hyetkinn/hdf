type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-[#d9d2cb] bg-white p-8 text-center">
      <h3 className="text-lg font-semibold text-[#1f2a44]">{title}</h3>
      <p className="mt-2 text-sm text-[#5f677a]">{description}</p>
    </div>
  );
}
