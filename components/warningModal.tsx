export default function WarningModal({
  action,
  id,
  name,
}: {
  action: () => void;
  id: number | string;
  name: string;
}) {
  return (
    <div>
      <input
        type="checkbox"
        id={`my-modal-${name}${id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this {name}?
          </h3>
          <div className="modal-action flex gap-2">
            <label htmlFor={`my-modal-${name}${id}`} className="btn btn-info">
              Cancel
            </label>
            <label
              htmlFor={`my-modal-${name}${id}`}
              className="btn btn-error"
              onClick={action}
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
