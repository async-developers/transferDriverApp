
import { faDesktop, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
    { id: 1, label: "Fuel", value: 60, color: "secondary", icon: faDesktop },
    { id: 2, label: "Toll", value: 20, color: "primary", icon: faMobileAlt },
    { id: 3, label: "Parking", value: 10, color: "tertiary", icon: faTabletAlt },
    { id: 4, label: "Car Wash", value: 10, color: "tertiary", icon: faTabletAlt }
];

const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

export {
    trafficShares,
    totalOrders
};