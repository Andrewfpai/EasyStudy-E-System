export default function NormalField({label, type, refValue}:any){
    return(
        <div className="flex flex-col">
            <label className="mb-2 font-bold">{label}</label>
            <input
            type={type}
            ref={refValue}
            className="px-4 py-2 border border-E-gray-b rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
        </div>
    );
}