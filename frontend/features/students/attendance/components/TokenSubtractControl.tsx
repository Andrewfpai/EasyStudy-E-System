interface TokenSubtractControlProps {
  tokenInput: number | null;
  onTokenInputChange: (value: number | null) => void;
  onSubtract: () => void;
  disabled: boolean;
  canSubtract: boolean;
}

export function TokenSubtractControl({
  tokenInput,
  onTokenInputChange,
  onSubtract,
  disabled,
  canSubtract,
}: TokenSubtractControlProps) {
  return (
    <div className="grid grid-cols-4 col-span-2 flex items-center gap-2">
      <input
        type="number"
        value={tokenInput ?? ""}
        onChange={(e) => onTokenInputChange(e.target.value ? parseInt(e.target.value) : null)}
        placeholder="Token amount"
        className="px-4 py-2.5 col-span-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-sm"
      />
      <div className="col-span-2">
        <button
          className={`px-4 py-2.5 rounded-lg ${
            canSubtract
              ? "bg-primary text-white cursor-pointer"
              : "bg-E-gray-b text-E-gray cursor-not-allowed"
          }`}
          onClick={onSubtract}
          disabled={disabled}
        >
          Subtract Token
        </button>
      </div>
    </div>
  );
}