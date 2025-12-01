import React from 'react';

const ThemeTestPage: React.FC = () => {
  return (
    <div className='p-8 space-y-12'>
      <h1 className='nsr-34-eb mb-8'>Theme Test Page</h1>
      {/* Color Palette */}
      <section>
        <h2 className='nsr-24-eb mb-4'>Colors</h2>

        <div className='space-y-6'>
          {/* Background Colors */}
          <div>
            <h3 className='nsr-20-eb mb-2'>Background Colors</h3>
            <div className='grid grid-cols-4 gap-4'>
              <div className='space-y-2'>
                <div className='w-full h-20 rounded border bg-purple-50' />
                <p className='inter-12-r'>bg-purple-50</p>
              </div>
              <div className='space-y-2'>
                <div className='w-full h-20 rounded border bg-purple-100' />
                <p className='inter-12-r'>bg-purple-100</p>
              </div>
              <div className='space-y-2'>
                <div className='w-full h-20 rounded border bg-purple-300' />
                <p className='inter-12-r'>bg-purple-300</p>
              </div>
              <div className='space-y-2'>
                <div className='w-full h-20 rounded border bg-purple-500' />
                <p className='inter-12-r'>bg-purple-500</p>
              </div>
              <div className='space-y-2'>
                <div className='w-full h-20 rounded border bg-purple-600' />
                <p className='inter-12-r'>bg-purple-600</p>
              </div>
              <div className='space-y-2'>
                <div className='w-full h-20 rounded border bg-purple-700' />
                <p className='inter-12-r'>bg-purple-700</p>
              </div>
              <div className='space-y-2'>
                <div className='w-full h-20 rounded border bg-purple-800' />
                <p className='inter-12-r'>bg-purple-800</p>
              </div>
            </div>
          </div>

          {/* Foreground Colors */}
          <div>
            <h3 className='nsr-20-eb mb-2'>Foreground Colors</h3>
            <div className='grid grid-cols-4 gap-4'>
              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-primary'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-primary</p>
              </div>

              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-purple-100'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-purple-100</p>
              </div>

              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-purple-600'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-purple-600</p>
              </div>

              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-purple-800'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-purple-800</p>
              </div>

              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-cream'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-cream</p>
              </div>

              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-error'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-error</p>
              </div>

              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-blue'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-blue</p>
              </div>

              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-gray'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-gray</p>
              </div>

              <div className='space-y-2'>
                <div className='w-full h-20 flex items-center justify-center bg-white border rounded'>
                  <span className='nbp-16-b text-fg-disabled'>Aa</span>
                </div>
                <p className='inter-12-r'>text-fg-disabled</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border & Shadow */}
      <section>
        <h2 className='nsr-24-eb mb-4'>Border & Shadow</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='p-4 border-2 border-purple rounded'>
            <p className='inter-12-r'>border-purple</p>
          </div>
          <div className='p-4 bg-white rounded shadow-purple'>
            <p className='inter-12-r'>shadow-purple</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThemeTestPage;
