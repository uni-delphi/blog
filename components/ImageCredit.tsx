export default function ImageCredit({ credit }: { credit: string }) {
  return (
    <p className="absolute bottom-2 left-2 text-gray-300 text-xs">
      Foto: {credit || "N/C"}
    </p>
  );
}
