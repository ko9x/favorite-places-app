const GOOGLE_API_KEY = 'AIzaSyDmrHsdTH321AkgSX2JNkhPCzkfpVGgFA0';

export default function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:green%7Clabel:S%7C${lat},${lng}
    &key=${GOOGLE_API_KEY}`;

    console.log('imagePreviewUrl', imagePreviewUrl ); //@DEBUG

    return imagePreviewUrl;
}