import React from 'react'

export default function DesignSystemPage() {
  return (
    <main className="p-8 space-y-12 bg-white text-neutral-900">
      <section>
        <h1 className="text-preset-1 mb-4">Design System Verification</h1>
        <p className="text-preset-3 text-neutral-500">Checking design tokens and presets.</p>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-preset-2">Colors</h2>

        <div className="space-y-4">
          <h3 className="text-preset-3">Neutral Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((num) => (
              <div key={num} className="p-4 border rounded shadow-sm">
                <div className="w-full h-16 border border-gray-200 mb-2 rounded" style={{ backgroundColor: `var(--color-neutral-${num})` }}></div>
                <p className="text-preset-5">Neutral {num}</p>
                <code className="text-xs text-gray-500">var(--color-neutral-{num})</code>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-preset-3">Neutral Palette (Dark Mode Reference)</h3>
          <div className="p-6 bg-[#051513] rounded-lg">
            {' '}
            {/* Manual dark bg to verify dark tokens */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[0, 100, 300, 400, 500, 600, 800, 900].map((num) => (
                <div key={num} className="p-4 border border-gray-700 rounded shadow-sm">
                  <div className="w-full h-16 border border-gray-600 mb-2 rounded" style={{ backgroundColor: `var(--color-neutral-dark-${num})` }}></div>
                  <p className="text-preset-5 text-white">Neutral {num}</p>
                  <code className="text-xs text-gray-400">var(--color-neutral-dark-{num})</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-preset-3">Brand & Semantic</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Teal 700', var: 'teal-700' },
              { name: 'Teal 800', var: 'teal-800' },
              { name: 'Grey 300', var: 'grey-300' },
              { name: 'Red 600', var: 'red-600' },
              { name: 'Red 800', var: 'red-800' },
              { name: 'Background', var: 'background' },
              { name: 'Foreground', var: 'foreground' },
            ].map((color) => (
              <div key={color.var} className="p-4 border rounded shadow-sm">
                <div
                  className="w-full h-16 border border-gray-200 mb-2 rounded"
                  style={{ backgroundColor: `var(--color-${color.var})` }} // Note: background/foreground might need special handling if they don't follow pattern, but in globals.css they are mapped to vars or colors. Actually --background is just vars. Let's start with style={{ backgroundColor: `var(--color-${color.var})` }} but for background it is var(--background) without color- prefix in standard tailwind, BUT in my globals I mapped --color-background: var(--background). So --color-background works.
                ></div>
                <p className="text-preset-5">{color.name}</p>
                <code className="text-xs text-gray-500">var(--color-{color.var})</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-preset-2">Typography</h2>
        <div className="space-y-6 border p-6 rounded bg-neutral-100">
          <div>
            <p className="text-xs text-gray-400 mb-1">Preset 1 (24px Bold)</p>
            <div className="text-preset-1">The quick brown fox jumps over the lazy dog.</div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Preset 2 (20px Bold)</p>
            <div className="text-preset-2">The quick brown fox jumps over the lazy dog.</div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Preset 3 (16px SemiBold)</p>
            <div className="text-preset-3">The quick brown fox jumps over the lazy dog.</div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Preset 4 (14px SemiBold)</p>
            <div className="text-preset-4">The quick brown fox jumps over the lazy dog.</div>
            <p className="text-xs text-gray-400 mt-2 mb-1">Preset 4 Medium (14px Medium + Spaced)</p>
            <div className="text-preset-4-medium">The quick brown fox jumps over the lazy dog.</div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Preset 5 (12px Medium)</p>
            <div className="text-preset-5">The quick brown fox jumps over the lazy dog.</div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Preset 6 (16px Regular)</p>
            <div className="text-preset-6">The quick brown fox jumps over the lazy dog.</div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="space-y-4">
        <h2 className="text-preset-2">Spacing</h2>
        <div className="flex flex-wrap items-end gap-2 p-4 bg-neutral-100 rounded">
          {[
            { name: '050', var: 'spacing-050' },
            { name: '100', var: 'spacing-100' },
            { name: '200', var: 'spacing-200' },
            { name: '300', var: 'spacing-300' },
            { name: '400', var: 'spacing-400' },
            { name: '500', var: 'spacing-500' },
          ].map((space) => (
            <div key={space.var} className="flex flex-col items-center">
              <div className="bg-teal-700 w-4" style={{ height: `var(--${space.var})` }}></div>
              <span className="text-xs mt-1">{space.name}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
