export default function Profile (props) {
    return (
        <div>
           <h1 className="text-white">xp: {props.xp - ((props.lvl - 1) * 1000)} / 1000</h1> 
           <h1 className="text-white">lvl: {props.lvl}</h1>
           <button onClick={() => props.update('profile', false)}>close</button>
        </div>
    )
}