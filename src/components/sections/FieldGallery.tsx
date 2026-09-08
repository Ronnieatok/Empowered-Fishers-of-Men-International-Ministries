import MorphImage from "@/components/ui/MorphImage";

/**
 * FieldGallery
 * -----------------------------------------------------------------------
 * A grid of photos from field visits, partner trips, and community life.
 * Sits after PartnerTestimonials to reinforce authenticity right before
 * the donation ask — donors see real people and real places, not stock
 * photography.
 *
 * Layout: CSS columns for a masonry-style grid (varying image heights
 * look natural rather than forcing a uniform aspect ratio that would
 * crop these phone photos awkwardly).
 */

interface GalleryImage {
  src: string;
  alt: string;
}

const IMAGES: GalleryImage[] = [
  {
    src: "/images/gallery-community-welcome.jpg",
    alt: "Community members and children welcoming visitors outside a church building",
  },
  {
    src: "/images/gallery-partner-visit-1.jpg",
    alt: "A pastor and a visiting partner sharing a moment together in the field",
  },
  {
    src: "/images/gallery-hillside-overlook.jpg",
    alt: "View overlooking a Turkana village from a rocky hillside",
  },
  {
    src: "/images/gallery-livestock-support.jpg",
    alt: "Two young men with livestock, reflecting the ministry's veterinary support work",
  },
  {
    src: "/images/gallery-walking-to-village.jpg",
    alt: "Team members walking a rocky path toward a village",
  },
  {
    src: "/images/gallery-partner-visit-2.jpg",
    alt: "Visiting partners standing together overlooking the region",
  },
  {
    src: "/images/gallery-hilltop-view.jpg",
    alt: "A community member looking out over the plains from a hilltop",
  },
  {
    src: "/images/gallery-field-vehicle.jpg",
    alt: "The field vehicle used for ministry visits and logistics",
  },
];

export default function FieldGallery() {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="bg-charcoal-900 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          In the Field
        </p>
        <h2 id="gallery-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
          Moments From the Work
        </h2>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {IMAGES.map((img, index) => (
            <MorphImage
              key={img.src}
              mode="hover"
              startIndex={index}
              src={img.src}
              alt={img.alt}
              width={600}
              height={800}
              loading="lazy"
              className="break-inside-avoid border border-charcoal-700"
              imageClassName="h-auto w-full object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
